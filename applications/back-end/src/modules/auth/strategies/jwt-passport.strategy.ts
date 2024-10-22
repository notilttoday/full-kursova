import { Injectable, Scope, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { EncryptedJwtAuthToken } from '@boilerplate/core/interfaces/auth'
import { HttpServerRequestUser } from '@boilerplate/core/interfaces/http'

import { config } from '@boilerplate/back-end/config'

import { TokenService } from '@boilerplate/back-end/modules/auth/services/token.service'

@Injectable({
  scope: Scope.DEFAULT,
})
export class JwtPassportStrategy extends PassportStrategy(Strategy, 'jwt-passport') {
  constructor(private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('auth.jwt.secret'),
      passReqToCallback: true,
    })
  }

  async validate(request: Request, token: EncryptedJwtAuthToken): Promise<HttpServerRequestUser> {
    const { data } = token

    if (!data) {
      throw new UnauthorizedException()
    }

    const authorization = request.headers.authorization
    const isTokenInBlacklist = await this.tokenService.isTokenInBlacklist(authorization)

    if (isTokenInBlacklist) {
      throw new UnauthorizedException()
    }

    const { result: httpUser } = await this.tokenService.getUser({ data })

    return httpUser
  }
}
