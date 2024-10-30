import { Injectable } from '@nestjs/common'

import { GetContactMessage } from '@boilerplate/types/contact-message/interfaces/contact-message'

import { ContactMessageEntity } from '@boilerplate/back-end/modules/contact-message/entities/contact-message.entity'

@Injectable()
export class ContactMessagesDataMapper {
  toContactMessage(entity: ContactMessageEntity): GetContactMessage {
    const { id, firstName, lastName, email, phone, message, userId } = entity

    return {
      id,
      firstName,
      lastName,
      email,
      phone,
      message,
      userId,
    }
  }
}
