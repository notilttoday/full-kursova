import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, isString, IsString } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

import { GetContactMessage } from '@boilerplate/types/contact-message/interfaces/contact-message'

export class GetContactMessageDto implements GetContactMessage {
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

  @IsString()
  message: string

  @IsString()
  userId: string
}

export class GetContactMessagesHttpResponseDto extends HttpListServerResponseDto<GetContactMessageDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetContactMessageDto)
  result?: GetContactMessageDto[]
}
