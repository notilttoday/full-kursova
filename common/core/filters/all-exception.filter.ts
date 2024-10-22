import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { isObject } from 'class-validator'
import { Observable, throwError } from 'rxjs'

import { HttpServerRequest } from '@boilerplate/core/interfaces/http'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  protected readonly logger = new Logger('Exception')

  catch(
    exception: (Error | HttpException) & {
      error?: string
      statusCode?: number
    },
    host: ArgumentsHost,
  ): Observable<unknown> {
    const { headers, user } = this.getRequestFromHost(host)

    if (exception.message && exception.statusCode) {
      this.logger.error({ headers, user, exception })

      return this.buildResponseFromHost(host, exception)
    }

    const httpException = exception as HttpException

    if (httpException.getResponse) {
      const res = httpException.getResponse()

      const error = isObject(res) ? res : { message: res }

      this.logger.error({ headers, user, error })

      return this.buildResponseFromHost(host, {
        statusCode: httpException.getStatus(),
        ...error,
      })
    }

    if (exception.error === 'Forbidden resource') {
      return this.buildResponseFromHost(host, {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Access denied',
      })
    }

    const stack = exception.stack || undefined

    this.logger.error({ headers, user, exception, stack })

    return this.buildResponseFromHost(host, {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    })
  }

  private getRequestFromHost(host: ArgumentsHost): HttpServerRequest<string, unknown, Record<string, string>> {
    const contextType = host.getType()

    switch (contextType) {
      case 'http':
        return host.switchToHttp().getRequest()
      case 'rpc':
        return host.switchToRpc().getData()
      case 'ws':
        return host.switchToWs().getData()
      default: {
        const unhandledType: never = contextType

        throw new BadRequestException(`Unhandled execution context type ${unhandledType}`)
      }
    }
  }

  private buildResponseFromHost(host: ArgumentsHost, response: unknown): Observable<unknown> {
    const contextType = host.getType()

    switch (contextType) {
      case 'http':
        return host
          .switchToHttp()
          .getResponse()
          .status((response as { statusCode: number })?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
          .json(response)
      case 'rpc':
      case 'ws':
        return throwError(() => response)
      default: {
        const unhandledType: never = contextType

        throw new BadRequestException(`Unhandled execution context type ${unhandledType}`)
      }
    }
  }
}
