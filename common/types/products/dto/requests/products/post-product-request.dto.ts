import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsString, Min, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { HttpRequestFieldCast, Method } from '@boilerplate/core/interfaces/http'

import { GameType, type PostProductData } from '@boilerplate/types/products/interfaces/products'

export const PostProductUrl = '/products'

export class PostProductDataDto implements Omit<PostProductData, 'file'> {
  @HttpRequestFieldDecorator()
  @IsString()
  title: string

  @HttpRequestFieldDecorator()
  @IsString()
  description: string

  @HttpRequestFieldDecorator({ cast: HttpRequestFieldCast.Number })
  @IsNumber()
  @Min(0.01)
  price: number

  @HttpRequestFieldDecorator()
  @IsEnum(GameType)
  game: GameType
}

export class PostProductHttpServerRequestDto extends HttpServerRequestDto<typeof PostProductUrl, PostProductDataDto> {
  readonly method = Method.Post

  readonly url = PostProductUrl

  @ValidateNested()
  @Type(() => PostProductDataDto)
  readonly data: PostProductDataDto
}

export class PostProductHttpClientRequestDto extends HttpClientRequestDto<typeof PostProductUrl, FormData> {
  readonly method = Method.Post

  readonly url = PostProductUrl

  @ValidateNested()
  @Type(() => FormData)
  readonly data: FormData
}
