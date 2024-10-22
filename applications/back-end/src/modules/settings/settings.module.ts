import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'

import { SettingsEntity } from '@boilerplate/back-end/modules/settings/entities/settings.entity'

import { SettingsRepository } from '@boilerplate/back-end/modules/settings/repositories/settings.repository'

import { SettingsController } from '@boilerplate/back-end/modules/settings/controllers/settings.controller'

import { SettingsService } from '@boilerplate/back-end/modules/settings/services/settings.service'

import { SettingsDataMapper } from '@boilerplate/back-end/modules/settings/data-mappers/settings.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([SettingsEntity]), forwardRef(() => AuthModule)],
  controllers: [SettingsController],
  providers: [SettingsRepository, SettingsService, SettingsDataMapper],
  exports: [SettingsRepository, SettingsService, SettingsDataMapper],
})
export class SettingsModule {}
