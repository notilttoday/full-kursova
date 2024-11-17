import { InjectQueue } from '@nestjs/bull'
import { Injectable, Scope, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Queue } from 'bull'
import { Request } from 'express'
import ms from 'ms'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { EncryptedAuthToken, EncryptedJwtAuthToken } from '@boilerplate/core/interfaces/auth'
import { ProcessorNames, QueueNames } from '@boilerplate/core/interfaces/queue'

import { config } from '@boilerplate/back-end/config'

import { DeleteTokenJobData } from '@boilerplate/back-end/modules/auth/interfaces/services/token'

import { TokenService } from '@boilerplate/back-end/modules/auth/services/token.service'

@Injectable({
  scope: Scope.DEFAULT,
})
export class JwtPassportRefreshStrategy extends PassportStrategy(Strategy, 'jwt-passport-refresh') {
  @InjectQueue(QueueNames.Token)
  private readonly deleteTokenQueue: Queue<DeleteTokenJobData>

  private readonly configs = {
    delay: ms(<string>config.get('bull.processors.deleteToken.delay')),
  }

  constructor(private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.get('auth.jwt.secret'),
      passReqToCallback: true,
    })
  }

  async validate(request: Request, token: EncryptedJwtAuthToken): Promise<EncryptedAuthToken> {
    const { data } = token

    if (!data) {
      throw new UnauthorizedException()
    }

    const authorization = request.headers.authorization
    const isTokenInBlacklist = await this.tokenService.isTokenInBlacklist(authorization)

    if (isTokenInBlacklist) {
      throw new UnauthorizedException()
    }

    const {
      result: { isRefreshable, token: newEncryptedToken },
    } = await this.tokenService.getState({ data })

    if (!isRefreshable) {
      throw new UnauthorizedException()
    }

    const newEncryptedData = newEncryptedToken?.data

    if (newEncryptedData) {
      await this.deleteTokenQueue.add(
        ProcessorNames.DeleteToken,
        { authorization },
        { removeOnComplete: true, removeOnFail: true, delay: this.configs.delay },
      )
    }

    return { data: newEncryptedData ?? data }
  }
}
