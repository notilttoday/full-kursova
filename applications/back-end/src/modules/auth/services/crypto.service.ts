import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { config } from '@boilerplate/back-end/config'

@Injectable()
export class CryptoService {
  private readonly config = {
    salt: config.get('app.hashSalt'),
  }

  async hash(value: string): Promise<string> {
    const result = await bcrypt.hash(value, this.config.salt)

    return result
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(value, hash)

    return result
  }
}
