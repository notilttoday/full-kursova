import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { GetHealthCheckUrl } from '@boilerplate/types/health-check/dto/requests/health-check'
import { GetHealthCheckResultHttpServerResponseDto } from '@boilerplate/types/health-check/dto/responses/health-check'

import { HealthCheckService } from '@boilerplate/back-end/modules/health-check/services/health-check.service'

@Controller()
@ApiTags('HealthCheck')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get(GetHealthCheckUrl)
  async ping(): Promise<GetHealthCheckResultHttpServerResponseDto> {
    return await this.healthCheckService.ping()
  }
}
