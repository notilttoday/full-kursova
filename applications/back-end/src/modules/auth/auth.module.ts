import { CacheModule } from '@nestjs/cache-manager'
import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as redisStore from 'cache-manager-redis-store'
import { ClientOpts as RedisClientOptions } from 'redis'

import { config } from '@boilerplate/back-end/config'

import { JwtPassportLogoutStrategy } from '@boilerplate/back-end/modules/auth/strategies/jwt-passport-logout.strategy'
import { JwtPassportRefreshStrategy } from '@boilerplate/back-end/modules/auth/strategies/jwt-passport-refresh.strategy'
import { JwtPassportStrategy } from '@boilerplate/back-end/modules/auth/strategies/jwt-passport.strategy'

import { SettingsModule } from '@boilerplate/back-end/modules/settings/settings.module'

import { ProfileEntity } from '@boilerplate/back-end/modules/auth/entities/profile.entity'
import { RefreshTokenEntity } from '@boilerplate/back-end/modules/auth/entities/refresh-token.entity'

import { ProfileController } from '@boilerplate/back-end/modules/auth/controllers/profile.controller'
import { TokensController } from '@boilerplate/back-end/modules/auth/controllers/tokens.controller'

import { CryptoService } from '@boilerplate/back-end/modules/auth/services/crypto.service'
import { JweService } from '@boilerplate/back-end/modules/auth/services/jwe.service'
import { ProfileService } from '@boilerplate/back-end/modules/auth/services/profile.service'
import { TokenService } from '@boilerplate/back-end/modules/auth/services/token.service'

import { ProfileDataMapper } from '@boilerplate/back-end/modules/auth/data-mappers/profile.data-mapper'
import { TokensDataMapper } from '@boilerplate/back-end/modules/auth/data-mappers/tokens.data-mapper'

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      prefix: 'auth-module:',
      store: redisStore,
      url: config.get('redis.url'),
    }),
    JwtModule.register({
      secret: config.get('auth.jwt.secret'),
      signOptions: {
        expiresIn: config.get('auth.jwt.expire'),
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt-passport' }),
    TypeOrmModule.forFeature([ProfileEntity, RefreshTokenEntity]),
    forwardRef(() => SettingsModule),
  ],
  controllers: [TokensController, ProfileController],
  providers: [
    JwtPassportLogoutStrategy,
    JwtPassportRefreshStrategy,
    JwtPassportStrategy,

    CryptoService,
    JweService,
    TokenService,
    ProfileService,

    ProfileDataMapper,
    TokensDataMapper,
  ],
  exports: [
    JwtPassportLogoutStrategy,
    JwtPassportRefreshStrategy,
    JwtPassportStrategy,

    CryptoService,
    JweService,
    TokenService,
    ProfileService,
  ],
})
export class AuthModule {}
