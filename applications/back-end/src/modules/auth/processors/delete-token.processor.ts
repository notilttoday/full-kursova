import { OnQueueActive, OnQueueCompleted, OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

import { ProcessorNames, QueueNames } from '@boilerplate/core/interfaces/queue'

import { config } from '@boilerplate/back-end/config'

import { DeleteTokenJobData } from '@boilerplate/back-end/modules/auth/interfaces/services/token'

import { TokenService } from '@boilerplate/back-end/modules/auth/services/token.service'

@Processor(QueueNames.Token)
export class DeleteTokenProcessor {
  protected readonly logger = new Logger(DeleteTokenProcessor.name)

  constructor(private readonly tokenService: TokenService) {}

  @Process({
    name: ProcessorNames.DeleteToken,
    concurrency: config.get('bull.processors.deleteToken.concurrency'),
  })
  async handleDeleteToken(job: Job<DeleteTokenJobData>): Promise<void> {
    const {
      data: { authorization },
    } = job

    try {
      await this.tokenService.setTokenToBlacklist(authorization)
    } catch (error) {
      this.logger.error({ msg: `Failed to post vacancy response to Lobby X`, error })
    }
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error): void {
    this.logger.error(
      `Processing job ${job.id} of type ${job.name} with data ${job.data} was failed with error: ${error}`,
    )
  }

  @OnQueueError()
  onError(error: Error): void {
    this.logger.error(`Queue was failed with error: ${error}`)
  }

  @OnQueueActive()
  onActive(job: Job): void {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`)
  }

  @OnQueueCompleted()
  onCompete(job: Job): void {
    this.logger.log(`Job ${job.id} of type ${job.name} was completed`)
  }
}
