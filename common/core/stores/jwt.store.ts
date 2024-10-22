import Cookies from 'js-cookie'
import console from 'loglevel'

import { type EncryptedJwtAuthToken } from '@boilerplate/core/interfaces/auth'

export const jwtStore = {
  key: 'jwt',
  get(): string | undefined {
    return Cookies.get(jwtStore.key)
  },
  set(token: string): void {
    try {
      const data = JSON.parse(atob(token.split('.')[1])) as EncryptedJwtAuthToken

      const exp = new Date(data.exp * 1000)

      Cookies.set(jwtStore.key, token, { expires: exp })
    } catch (error) {
      console.error(error)

      Cookies.set(jwtStore.key, token)
    }
  },
  clear(): void {
    Cookies.remove(jwtStore.key)
  },
}
