export enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface User {
  gid: string
  roles: Role[]
  loginAt?: string
}

export interface AuthTokenData {
  refreshToken: string
  user: User
}

export interface EncryptedJwtAuthToken {}
