export interface EncryptedAuthToken {
  data: string
}

export interface EncryptedJwtAuthToken extends EncryptedAuthToken {
  iat: number
  exp: number
}

export interface AuthTokenState {
  isRefreshable: boolean
  token?: EncryptedAuthToken
}
