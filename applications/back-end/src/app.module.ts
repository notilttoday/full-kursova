import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { config } from '@boilerplate/back-end/config'

import { DatabaseNamingStrategy } from '@boilerplate/back-end/db/database-naming.strategy'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'
import { ContactMessageModule } from '@boilerplate/back-end/modules/contact-message/contact-messages.module'
import { HealthCheckModule } from '@boilerplate/back-end/modules/health-check/health-check.module'
import { OrdersModule } from '@boilerplate/back-end/modules/orders/orders.module'
import { ProductsModule } from '@boilerplate/back-end/modules/products/products.module'
import { SettingsModule } from '@boilerplate/back-end/modules/settings/settings.module'

const sslRejectUnauthorized = config.get('database.ssl.rejectUnauthorized')
const sslCA = config.get('database.ssl.ca')
const sslKey = config.get('database.ssl.key')
const sslCert = config.get('database.ssl.cert')

const ssl =
  sslRejectUnauthorized || sslCA || sslKey || sslCert
    ? {
        rejectUnauthorized: sslRejectUnauthorized,
        ca: sslCA,
        key: sslKey,
        cert: sslCert,
      }
    : undefined

@Module({
  imports: [
    AuthModule,
    HealthCheckModule,
    OrdersModule,
    ProductsModule,
    SettingsModule,
    ContactMessageModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.get('database.url'),
      autoLoadEntities: true,
      synchronize: config.get('database.synchronize'),
      migrationsRun: config.get('database.migrationsRun'),
      logging: config.get('database.logging'),
      namingStrategy: new DatabaseNamingStrategy(),
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/**/migrations/*{.js,.ts}`],
      ssl,
    }),
    BullModule.forRoot({
      url: config.get('redis.url'),
      // the limiter is optional. needed for high load and can be changed
      limiter: {
        max: config.get('bull.limiter.max'),
        duration: config.get('bull.limiter.duration'),
        bounceBack: config.get('bull.limiter.bounceBack'),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
