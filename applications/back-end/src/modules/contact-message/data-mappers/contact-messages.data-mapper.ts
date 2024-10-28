import { Injectable } from '@nestjs/common'

import { PostContactMessage } from '@boilerplate/types/contact-message/interfaces/contact-message'
import { ContactMessageEntity } from '@boilerplate/back-end/modules/contact-message/entities/contact-message.entity'

@Injectable()
export class ContactMessagesDataMapper {
  toProductShort(entity: ContactMessageEntity): PostContactMessage {
    const { firstName, lastName, email, phone, message, userId } = entity

    return {
      firstName,
      lastName,
      email,
      phone,
      message,
      userId,
    }
  }
}
