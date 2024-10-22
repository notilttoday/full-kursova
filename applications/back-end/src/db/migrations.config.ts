import { DataSource } from 'typeorm'

import { config } from '@boilerplate/back-end/config'

import { DatabaseNamingStrategy } from '@boilerplate/back-end/db/database-naming.strategy'

export const dataSource = new DataSource({
  type: 'postgres',
  url: config.get('database.url'),
  namingStrategy: new DatabaseNamingStrategy(),
  migrations: [`${__dirname}/../**/migrations/*{.js,.ts}`],
  entities: [`${__dirname}/../**/*.entity{.js,.ts}`],
})
