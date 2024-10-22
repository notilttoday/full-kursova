import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtPassportLogoutAuthGuard extends AuthGuard('jwt-passport-logout') {
  constructor() {
    super({
      property: 'encryptedToken',
    })
  }
}
