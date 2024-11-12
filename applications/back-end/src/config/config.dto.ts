export interface ConfigDto {
  app: {
    port: number
    url: string
    logLevel: string
    gidSalt: string
    hashSalt: string
  }
  swagger: {
    enabled: boolean
  }
  auth: {
    token: {
      jwkSecretData: string
      refreshTtl: number
    }
    jwt: {
      secret: string
      expire: string
      blacklistPrefix: string
    }
  }
  redis: {
    url: string
  }
  cors: {
    origins: string
  }
  database: {
    url: string
    logging: boolean
    synchronize: boolean
    migrationsRun: boolean
    ssl: {
      rejectUnauthorized: boolean
      ca: string
      key: string
      cert: string
    }
  }
  bull: {
    limiter: {
      duration: number
      max: number
      bounceBack: boolean
    }
    processors: {
      deleteToken: {
        delay: string
        concurrency: number
      }
    }
  }
}
