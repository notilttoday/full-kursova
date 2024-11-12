export interface GetContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  userId: string
}

export interface PostContactMessage {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  userId: string
}

export interface PostContactMessageResult {
  isSuccess: boolean
}
