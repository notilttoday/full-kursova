import { Injectable } from '@nestjs/common'

import { HttpServerResponse } from '@boilerplate/core/interfaces/http'

import { GetHealthCheckResult } from '@boilerplate/types/health-check/interfaces/health-check'

@Injectable()
export class HealthCheckService {
  async ping(): Promise<HttpServerResponse<GetHealthCheckResult>> {
    const result: GetHealthCheckResult = {
      timestamp: Date.now(),
    }

    return {
      result,
    }
  }
}
