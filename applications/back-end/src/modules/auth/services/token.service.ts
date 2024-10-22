import { createHash } from 'crypto'

import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import moment from 'moment'
import ms from 'ms'
import { Repository } from 'typeorm'

import { AuthTokenState, EncryptedAuthToken } from '@boilerplate/core/interfaces/auth'
import { HttpServerRequestUser, HttpServerResponse } from '@boilerplate/core/interfaces/http'
import { AuthTokenData, Role, User } from '@boilerplate/core/interfaces/user'

import { config } from '@boilerplate/back-end/config'

import { RefreshTokenEntity } from '@boilerplate/back-end/modules/auth/entities/refresh-token.entity'

import { JweService } from '@boilerplate/back-end/modules/auth/services/jwe.service'

@Injectable()
export class TokenService {
  private readonly config = {
    ttl: Number(ms(config.get('auth.jwt.expire'))),
    prefix: config.get('auth.jwt.blacklistPrefix'),
  }

  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache

  @InjectRepository(RefreshTokenEntity)
  private readonly refreshTokenRepository: Repository<RefreshTokenEntity>

  constructor(private readonly jweService: JweService) {}

  async getUser(encryptedAuthToken: EncryptedAuthToken): Promise<HttpServerResponse<HttpServerRequestUser>> {
    const { data } = encryptedAuthToken
    const { user } = await this.jweService.decryptJWE<AuthTokenData>(data)

    return {
      result: user,
    }
  }

  async getState(oldEncryptedToken: EncryptedAuthToken): Promise<HttpServerResponse<AuthTokenState>> {
    const { data } = oldEncryptedToken
    const {
      refreshToken,
      user: { roles },
    } = await this.jweService.decryptJWE<AuthTokenData>(data)

    const { userGid: tokenUserGid, expiresAt } = await this.getValidatedRefreshToken(refreshToken)

    const isRefreshable = expiresAt && moment().diff(expiresAt, 'milliseconds') < 0

    if (!isRefreshable) {
      return {
        result: { isRefreshable },
      }
    }

    return {
      result: {
        isRefreshable,
        token: await this.generateUserToken(tokenUserGid, roles),
      },
    }
  }

  private async getValidatedRefreshToken(refreshToken: string): Promise<RefreshTokenEntity> {
    const refreshTokenEntity = await this.refreshTokenRepository.findOne({
      where: {
        id: refreshToken,
      },
    })

    if (!refreshTokenEntity) {
      throw new UnauthorizedException()
    }

    return refreshTokenEntity
  }

  async generateUserToken(userGid: string, roles: Role[]): Promise<EncryptedAuthToken> {
    const refreshToken = await this.createRefreshToken(userGid)

    const user: User = {
      gid: userGid,
      roles,
      loginAt: moment().toISOString(),
    }

    const authToken: AuthTokenData = {
      refreshToken,
      user,
    }

    return {
      data: await this.jweService.encryptJWE(authToken),
    }
  }

  async isTokenInBlacklist(authToken: string): Promise<boolean> {
    const key = this.getBlacklistKey(authToken)

    if (!key) {
      return false
    }

    const record = await this.cacheManager.get(key)

    return Boolean(record)
  }

  async createRefreshToken(userGid: string): Promise<string> {
    const { id } = await this.refreshTokenRepository.save({
      userGid,
      expiresAt: moment().add(config.get('auth.token.refreshTtl'), 'milliseconds'),
      refreshedAt: moment().toDate(),
    })

    return id
  }

  async removeRefreshToken(encryptedToken: EncryptedAuthToken): Promise<boolean> {
    const { data } = encryptedToken

    const { refreshToken } = await this.jweService.decryptJWE<AuthTokenData>(data)

    this.refreshTokenRepository.delete({
      id: refreshToken,
    })

    return true
  }

  async setTokenToBlacklist(authToken: string): Promise<boolean> {
    const key = this.getBlacklistKey(authToken)

    if (!key) {
      return false
    }

    return await this.cacheManager.set(key, true, { ttl: this.config.ttl / 1000 })
  }

  private getBlacklistKey(authToken: string): string | null {
    const bearerToken = authToken?.split(' ')[1] || null

    if (!bearerToken) {
      return null
    }

    const tokenHash = createHash('sha256').update(bearerToken).digest('hex')

    return [this.config.prefix, tokenHash].join('')
  }
}
