export enum GameType {
  Dota = 'dota',
  TheWitcher = 'the_witcher',
  WorldOfWarcraft = 'world_of_warcraft',
  Diablo = 'diablo',
  AssassinsCreed = 'assassins_creed',
}

export interface GetProductShort {
  id: string
  title: string
  price: number
  imagePath?: string
}

export interface GetProduct extends GetProductShort {
  description: string
  game: string
}

export interface PostProductData {
  title: string
  description: string
  price: number
  game: GameType
  file: Express.Multer.File
}

export interface GetSearchProductsData extends Record<string, string | readonly string[]> {
  title?: string
  game?: string[]
}

export interface PostProductResult {
  isSuccess: boolean
}

export interface GetSingleProductData {
  productId: string
}

export interface DeleteProductResult {
  isSuccess: boolean
}

export interface PatchProductData {
  title: string
  description: string
  price: number
  game: GameType
  file: Express.Multer.File
}
