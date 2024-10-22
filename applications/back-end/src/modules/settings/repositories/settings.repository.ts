import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { SettingsEntity } from '@boilerplate/back-end/modules/settings/entities/settings.entity'

@Injectable()
export class SettingsRepository extends Repository<SettingsEntity> {
  constructor(readonly dataSource: DataSource) {
    super(SettingsEntity, dataSource.createEntityManager())
  }
}
