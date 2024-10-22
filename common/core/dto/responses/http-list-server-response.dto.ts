import { IsArray, IsOptional, ValidateNested } from 'class-validator'

import { HttpListServerResponse } from '@boilerplate/core/interfaces/http'

export abstract class HttpListServerResponseDto<Result> implements HttpListServerResponse<Result> {
  @IsArray()
  @IsOptional()
  @ValidateNested()
  abstract result?: Result[]
}
