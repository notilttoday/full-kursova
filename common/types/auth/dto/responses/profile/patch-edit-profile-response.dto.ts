import { Type } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { MyProfile } from '@boilerplate/types/auth/interfaces/profile'
import { GameType } from '@boilerplate/types/products/interfaces/products'

export class EditProfileDto implements MyProfile {
  @IsOptional()
  @IsString()
  id: string

  @IsOptional()
  @IsString()
  firstName: string

  @IsOptional()
  @IsString()
  lastName: string

  @IsOptional()
  @IsString()
  email: string

  @IsOptional()
  @IsString()
  phone: string

  @IsOptional()
  @IsString()
  statusText?: string

  @IsOptional()
  @IsString({ each: true })
  favGames?: GameType[]
}

export class PatchProfileMyHttpServerResponseDto extends HttpServerResponseDto<EditProfileDto> {
  @IsOptional()
  @Type(() => EditProfileDto)
  result?: EditProfileDto
}
