import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { HttpServerResponse } from '@boilerplate/core/interfaces/http'

import { GetSettingsResult, PatchSettingsData, PatchSettingsResult } from '@boilerplate/types/settings/interfaces/settings'

import { SettingsEntity } from '@boilerplate/back-end/modules/settings/entities/settings.entity'

import { SettingsDataMapper } from '@boilerplate/back-end/modules/settings/data-mappers/settings.data-mapper'

@Injectable()
export class SettingsService {
  @InjectRepository(SettingsEntity)
  private readonly settingsEntity: Repository<SettingsEntity>

  constructor(private readonly settingsDataMapper: SettingsDataMapper) {}

  async getSettings(): Promise<HttpServerResponse<GetSettingsResult>> {
    const data = await this.settingsEntity.find()

    return {
      result: this.settingsDataMapper.toSettings(data),
    }
  }

  async patchSettings(data: PatchSettingsData): Promise<HttpServerResponse<PatchSettingsResult>> {
    await this.settingsEntity.upsert(this.settingsDataMapper.fromSettings(data), ['type'])

    const result: PatchSettingsResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }
}
