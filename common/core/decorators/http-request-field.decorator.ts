import { applyDecorators } from '@nestjs/common'
import { Expose, Transform } from 'class-transformer'

import { HttpRequestFieldCast, type HttpRequestFieldDecoratorConfig } from '@boilerplate/core/interfaces/http'

export function HttpRequestFieldDecorator<T, Y>(
  config?: HttpRequestFieldDecoratorConfig<T>,
): (target: object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void {
  const { cast, defaultValue, convertEmpty } = config || {}

  return applyDecorators(
    Expose(),
    Transform(({ value }) => {
      if (value === undefined) {
        return defaultValue
      }

      if (convertEmpty && !value && value !== false) {
        return defaultValue
      }

      if (cast) {
        switch (cast) {
          case HttpRequestFieldCast.Boolean:
            if (['false', 'off', '0'].includes(value)) {
              return false
            }

            return Boolean(value)
          case HttpRequestFieldCast.Number:
            return Number(value)
          case HttpRequestFieldCast.String:
            return `${value}`
          case HttpRequestFieldCast.Json:
            try {
              return JSON.parse(value)
            } catch (_) {
              return defaultValue
            }
          default: {
            const unhandledCast: never = cast

            throw new TypeError(`Unhandled owner type: ${unhandledCast}`)
          }
        }
      }

      return value
    }),
  )
}
