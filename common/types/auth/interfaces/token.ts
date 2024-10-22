export interface PutTokenData {
  email: string
  password: string
}

export interface PutTokenResult {
  token: string
}

export interface PostTokenData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

export interface PostTokenResult {
  isSuccess: boolean
}

export interface PatchTokenResult {
  token: string
}

export interface DeleteTokenResult {
  isSuccess: boolean
}
