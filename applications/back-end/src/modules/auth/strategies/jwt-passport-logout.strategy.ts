import { Injectable, Scope, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { EncryptedAuthToken, EncryptedJwtAuthToken } from '@boilerplate/core/interfaces/auth'

import { config } from '@boilerplate/back-end/config'

import { TokenService } from '@boilerplate/back-end/modules/auth/services/token.service'

@Injectable({
  scope: Scope.DEFAULT,
})
export class JwtPassportLogoutStrategy extends PassportStrategy(Strategy, 'jwt-passport-logout') {
  constructor(private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.get('auth.jwt.secret'),
      passReqToCallback: true,
    })
  }

  async validate(request: Request, encryptedToken: EncryptedJwtAuthToken): Promise<EncryptedAuthToken> {
    const { data } = encryptedToken

    if (!data) {
      throw new UnauthorizedException()
    }

    const authorization = request.headers.authorization

    await this.tokenService.setTokenToBlacklist(authorization)

    return { data }
  }
}
