import { IsObject, IsOptional, ValidateNested } from 'class-validator'

import { HttpServerResponse } from '@boilerplate/core/interfaces/http'

export abstract class HttpServerResponseDto<Result> implements HttpServerResponse<Result> {
  @IsObject()
  @IsOptional()
  @ValidateNested()
  abstract result?: Result
}
