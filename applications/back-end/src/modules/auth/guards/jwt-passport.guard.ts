import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { intersection } from 'lodash'
import { firstValueFrom, from } from 'rxjs'

import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { HttpServerRequest } from '@boilerplate/core/interfaces/http'

import { TokenService } from '@boilerplate/back-end/modules/auth/services/token.service'

@Injectable()
export class JwtPassportAuthGuard extends AuthGuard('jwt-passport') {
  constructor(
    private readonly tokenService: TokenService,

    private readonly reflector: Reflector,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const authorization = request.headers.authorization
    const isTokenInBlacklist = await this.tokenService.isTokenInBlacklist(authorization)

    if (isTokenInBlacklist) {
      throw new UnauthorizedException()
    }

    const result = super.canActivate(context)

    if (typeof result === 'boolean') {
      return result
    }

    await firstValueFrom(from(result))

    const { user } = context.switchToHttp().getRequest<HttpServerRequest<string, unknown, Record<string, string>>>()

    if (!user) {
      return false
    }

    const requiredRoles = [
      ...(this.reflector.get(Roles, context.getHandler()) || []),
      ...(this.reflector.get(Roles, context.getClass()) || []),
    ]

    if (requiredRoles.length === 0) {
      return true
    }

    return intersection(requiredRoles, user.roles).length > 0
  }
}
