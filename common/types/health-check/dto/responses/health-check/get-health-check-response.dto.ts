import { IsNumber } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { GetHealthCheckResult } from '@boilerplate/types/health-check/interfaces/health-check'

export class GetHealthCheckResultDto implements GetHealthCheckResult {
  @IsNumber()
  timestamp: number
}

export class GetHealthCheckResultHttpServerResponseDto extends HttpServerResponseDto<GetHealthCheckResultDto> {
  result?: GetHealthCheckResultDto
}
