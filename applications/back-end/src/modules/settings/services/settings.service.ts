import { Injectable } from '@nestjs/common'

import { HttpServerResponse } from '@boilerplate/core/interfaces/http'

import { GetSettingsResult, PatchSettingsData, PatchSettingsResult } from '@boilerplate/types/settings/interfaces/settings'

import { SettingsDataMapper } from '@boilerplate/back-end/modules/settings/data-mappers/settings.data-mapper'

import { SettingsRepository } from '@boilerplate/back-end/modules/settings/repositories/settings.repository'

@Injectable()
export class SettingsService {
  constructor(
    private readonly settingsDataMapper: SettingsDataMapper,

    private readonly settingsRepository: SettingsRepository
  ) {}

  async getSettings(): Promise<HttpServerResponse<GetSettingsResult>> {
    const data = await this.settingsRepository.find()

    return {
      result: this.settingsDataMapper.toSettings(data),
    }
  }

  async patchSettings(data: PatchSettingsData): Promise<HttpServerResponse<PatchSettingsResult>> {
    await this.settingsRepository.upsert(this.settingsDataMapper.fromSettings(data), ['type'])

    const result: PatchSettingsResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }
}
