import { Module } from '@nestjs/common'

import { HealthCheckController } from '@boilerplate/back-end/modules/health-check/controllers/health-check.controller'

import { HealthCheckService } from '@boilerplate/back-end/modules/health-check/services/health-check.service'

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
  exports: [],
})
export class HealthCheckModule {}
