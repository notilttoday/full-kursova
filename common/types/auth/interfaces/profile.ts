import { type GameType } from '@boilerplate/types/products/interfaces/products'

export interface MyProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  statusText?: string
  favGames?: GameType[]
  imagePath?: string
}

export interface PatchMyProfile {
  firstName: string
  lastName: string
  phone: string
  statusText?: string
  favGames?: GameType[]
  file: Express.Multer.File
}
