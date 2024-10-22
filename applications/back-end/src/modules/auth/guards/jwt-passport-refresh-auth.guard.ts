import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtPassportRefreshAuthGuard extends AuthGuard('jwt-passport-refresh') {
  constructor() {
    super({
      property: 'encryptedToken',
    })
  }
}
