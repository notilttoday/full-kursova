import { GameType } from '@boilerplate/types/products/interfaces/products'

export interface MyProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  statusText?: string
  favGames?: GameType[]
}