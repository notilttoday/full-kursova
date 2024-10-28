import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { ContactMessageEntity } from '@boilerplate/back-end/modules/contact-message/entities/contact-message.entity'

@Injectable()
export class ContactMessagesRepository extends Repository<ContactMessageEntity> {
  constructor(readonly dataSource: DataSource) {
    super(ContactMessageEntity, dataSource.createEntityManager())
  }
}
