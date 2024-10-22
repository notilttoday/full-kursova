import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

import { PaymentMethod, PaymentMethodType } from '@boilerplate/types/reference/interfaces/payment-method'

export class ReferencePaymentMethodsDto implements PaymentMethod {
  @IsString()
  id: string

  @IsEnum(PaymentMethodType)
  type: PaymentMethodType

  @IsString()
  title: string
}

export class GetReferencePaymentMethodsListHttpResponseDto extends HttpListServerResponseDto<ReferencePaymentMethodsDto> {
  @IsOptional()
  @IsArray()
  @Type(() => ReferencePaymentMethodsDto)
  result?: ReferencePaymentMethodsDto[]
}
