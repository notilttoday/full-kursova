import { Injectable, Logger } from '@nestjs/common'
import { JWE, JWK } from 'node-jose'

import { config } from '@boilerplate/back-end/config'

@Injectable()
export class JweService {
  protected readonly logger = new Logger(JweService.name)

  private key: JWK.key

  constructor() {
    this.init()
  }

  async init(): Promise<void> {
    this.key = await JWK.asKey(config.get('auth.token.jwkSecretData'), 'json')
  }

  async encryptJWE<T>(data: T): Promise<string> {
    const dataToEncrypt = this.handleUriData(data, encodeURIComponent)
    const enc = await JWE.createEncrypt({ format: 'compact' }, await this.getKey())
      .update(JSON.stringify(dataToEncrypt))
      .final()

    return enc
  }

  async decryptJWE<T>(data: string): Promise<T> {
    const dec = await JWE.createDecrypt(await this.getKey()).decrypt(data)
    const plainData = JSON.parse(dec.plaintext.toString())
    const decodedData = this.handleUriData(plainData, decodeURIComponent)

    return <T>decodedData
  }

  private async getKey(): Promise<JWK.Key> {
    if (!this.key) {
      throw new Error('JWK key is not defined!')
    }

    return this.key
  }

  private handleUriData(data: unknown, uriHandler: (str: string) => string): unknown {
    switch (true) {
      case Array.isArray(data): {
        return (<unknown[]>data).map((item: unknown) => this.handleUriData(item, uriHandler))
      }
      case typeof data === 'boolean': {
        return data
      }
      case typeof data === 'object' && data !== null: {
        Object.entries(data).forEach(([key, value]) => {
          data[key] = this.handleUriData(value, uriHandler)
        })

        return data
      }
      case typeof data === 'undefined': {
        return
      }
      default: {
        return uriHandler(<string>data)
      }
    }
  }
}
