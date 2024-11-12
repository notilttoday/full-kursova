import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { MyProfile } from '@boilerplate/types/auth/interfaces/profile'
import { GameType } from '@boilerplate/types/products/interfaces/products'

export class MyProfileDto implements MyProfile {
  @IsString()
  id: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  email: string

  @IsString()
  phone: string

  @IsOptional()
  @IsString()
  statusText?: string

  @IsOptional()
  @IsString({ each: true })
  favGames?: GameType[]
}

export class GetProfileMyHttpServerResponseDto extends HttpServerResponseDto<MyProfileDto> {
  @IsOptional()
  @Type(() => MyProfileDto)
  result?: MyProfileDto
}
