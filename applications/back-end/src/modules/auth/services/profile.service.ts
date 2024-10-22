import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { EncryptedAuthToken } from '@boilerplate/core/interfaces/auth'
import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'
import { Role } from '@boilerplate/core/interfaces/user'

import { MyProfile } from '@boilerplate/types/auth/interfaces/profile'
import {
  DeleteTokenResult,
  PatchTokenResult,
  PostTokenData,
  PostTokenResult,
  PutTokenData,
  PutTokenResult,
} from '@boilerplate/types/auth/interfaces/token'

import { ProfileEntity } from '@boilerplate/back-end/modules/auth/entities/profile.entity'

import { CryptoService } from '@boilerplate/back-end/modules/auth/services/crypto.service'
import { TokenService } from '@boilerplate/back-end/modules/auth/services/token.service'

import { ProfileDataMapper } from '@boilerplate/back-end/modules/auth/data-mappers/profile.data-mapper'
import { TokensDataMapper } from '@boilerplate/back-end/modules/auth/data-mappers/tokens.data-mapper'

@Injectable()
export class ProfileService {
  @InjectRepository(ProfileEntity)
  private readonly profileRepository: Repository<ProfileEntity>

  constructor(
    private readonly cryptoService: CryptoService,

    private readonly jwtService: JwtService,

    private readonly tokenService: TokenService,

    private readonly tokensDataMapper: TokensDataMapper,

    private readonly profileDataMapper: ProfileDataMapper,
  ) {}

  async login(data: PutTokenData): Promise<HttpServerResponse<PutTokenResult>> {
    const { email, password } = data

    const profile = await this.profileRepository.findOneBy({ email })

    if (!profile) {
      throw new UnauthorizedException()
    }

    const { password: encryptedPassword } = profile

    if (!(await this.cryptoService.compare(password, encryptedPassword))) {
      throw new UnauthorizedException()
    }

    const token = this.jwtService.sign(await this.tokenService.generateUserToken(profile.id, profile.roles))

    const result: PutTokenResult = {
      token,
    }

    return {
      result,
    }
  }

  async registration(data: PostTokenData): Promise<HttpServerResponse<PostTokenResult>> {
    const encryptedPassword = await this.cryptoService.hash(data.password)

    const profile = this.tokensDataMapper.toRegistrationProfile(data, encryptedPassword)

    await this.profileRepository.save(profile)

    const result: PostTokenResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }

  async refreshToken(encryptedToken: EncryptedAuthToken): Promise<HttpServerResponse<PatchTokenResult>> {
    const token = this.jwtService.sign(encryptedToken)

    const result: PatchTokenResult = {
      token,
    }

    return { result }
  }

  async logout(
    authorizationHeader: string,
    encryptedToken: EncryptedAuthToken,
  ): Promise<HttpServerResponse<DeleteTokenResult>> {
    await Promise.all([
      this.tokenService.setTokenToBlacklist(authorizationHeader),
      this.tokenService.removeRefreshToken(encryptedToken),
    ])

    const result: DeleteTokenResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }

  async getProfiles(userGids: string[]): Promise<HttpListServerResponse<ProfileEntity>> {
    const [result, total] = await this.profileRepository.findAndCountBy({
      id: In(userGids),
    })

    return {
      result,
      total,
    }
  }

  async getProfilesMap(userGids: string[]): Promise<HttpServerResponse<Map<string, MyProfile>>> {
    const { result: profiles } = await this.getProfiles(userGids)

    const result = new Map<string, MyProfile>()

    for (const profile of profiles) {
      result.set(profile.id, this.profileDataMapper.toMyProfile(profile))
    }

    return {
      result,
    }
  }

  async getMyProfile(userGid: string, role: Role): Promise<HttpServerResponse<MyProfile>> {
    const {
      result: [profile],
    } = await this.getProfiles([userGid])

    if (!profile.roles.includes(role)) {
      throw new ForbiddenException('Access denied')
    }

    return {
      result: this.profileDataMapper.toMyProfile(profile),
    }
  }
}
