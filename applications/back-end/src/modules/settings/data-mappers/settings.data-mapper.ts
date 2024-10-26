import { Injectable } from '@nestjs/common'

import { Settings, SettingsType } from '@boilerplate/types/settings/interfaces/settings'

import { SettingsEntity } from '@boilerplate/back-end/modules/settings/entities/settings.entity'

@Injectable()
export class SettingsDataMapper {
  toSettings(enitites: SettingsEntity[]): Settings {
    const settings = <Settings>{}

    for (const { type, value } of enitites) {
      settings[type] = <Settings[typeof type]>value
    }

    return settings
  }

  fromSettings(settings: Partial<Settings>): Partial<SettingsEntity>[] {
    const enitites = <Partial<SettingsEntity>[]>[]

    for (const [key, value] of Object.entries(settings)) {
      const type = <SettingsType>key

      enitites.push({ type, value })
    }

    return enitites
  }
}
