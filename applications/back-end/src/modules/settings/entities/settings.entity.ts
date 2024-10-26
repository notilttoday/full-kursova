import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { SettingsType } from '@boilerplate/types/settings/interfaces/settings'

@Entity()
export class SettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: SettingsType, unique: true })
  type: SettingsType

  @Column('json')
  value: string
}
