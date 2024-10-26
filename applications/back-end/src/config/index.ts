import { createProfiguration } from '@golevelup/profiguration'
import ms from 'ms'

import { type ConfigDto } from '@boilerplate/back-end/config/config.dto'

export const config = createProfiguration<ConfigDto>(
  {
    app: {
      port: {
        default: 80,
        env: 'PORT',
      },
      url: {
        default: '',
        env: 'APP_URL',
      },
      logLevel: {
        default: 'info',
        env: 'APP_LOG_LEVEL',
      },
      gidSalt: {
        default: 'mrrieow',
        env: 'APP_GID_SALT',
      },
      hashSalt: {
        default: '$2b$12$M0HLXMAOQY4sQY7vK4vdvO',
        env: 'APP_HASH_SALT',
      },
    },
    swagger: {
      enabled: {
        default: false,
        env: 'SWAGGER_ENABLED',
      },
    },
    cors: {
      origins: {
        default: '',
        env: 'CORS_ORIGINS',
      },
    },
    auth: {
      token: {
        jwkSecretData: {
          default: '',
          env: 'AUTH_TOKEN_JWK_SECRET_DATA',
        },
        refreshTtl: {
          default: ms('7d'),
          env: 'AUTH_TOKEN_REFRESH_TTL',
        },
      },
      jwt: {
        secret: {
          default: '',
          env: 'AUTH_JWT_SECRET',
        },
        expire: {
          default: '1m',
          env: 'AUTH_JWT_EXPIRE',
        },
        blacklistPrefix: {
          default: 'auth:jwt:blacklist:',
          env: 'AUTH_JWT_BLACKLIST_PREFIX',
        },
      },
    },
    redis: {
      url: {
        default: 'redis://aplus-redis.workspace:6379/0',
        env: 'REDIS_URL',
      },
    },
    database: {
      url: {
        default: '',
        env: 'DATABASE_URL',
      },
      logging: {
        default: false,
        env: 'DATABASE_LOGGING',
      },
      synchronize: {
        default: false,
        env: 'DATABASE_SYNCHRONIZE',
      },
      migrationsRun: {
        default: false,
        env: 'DATABASE_MIGRATIONS_RUN',
      },
      ssl: {
        rejectUnauthorized: {
          default: false,
          env: 'DATABASE_SSL_REJECT_UNAUTHORIZED',
        },
        ca: {
          default: '',
          env: 'DATABASE_SSL_CA',
        },
        key: {
          default: '',
          env: 'DATABASE_SSL_KEY',
        },
        cert: {
          default: '',
          env: 'DATABASE_SSL_CERT',
        },
      },
    },
  },
  {
    strict: false,
    verbose: false,
  },
)
