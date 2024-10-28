import { Injectable } from '@nestjs/common'

import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'

import { ContactMessagesDataMapper } from '@boilerplate/back-end/modules/contact-message/data-mappers/contact-messages.data-mapper'

import { ContactMessagesRepository } from '@boilerplate/back-end/modules/contact-message/repositories/contact-messages.repository'

import { PostContactMessage, PostContactMessageResult } from '@boilerplate/types/contact-message/interfaces/contact-message'

import { ProfileService } from '@boilerplate/back-end/modules/auth/services/profile.service'

@Injectable()
export class ContactMessageService {
  constructor(
    private readonly contactMessagesDataMapper: ContactMessagesDataMapper,

    private readonly contactMessagesRepository: ContactMessagesRepository,
  ) { }

  async postContactMessage(data: PostContactMessage): Promise<HttpServerResponse<PostContactMessageResult>> {
    const { firstName, lastName, email, phone, message, userId } = data

    await this.contactMessagesRepository.save({
      firstName,
      lastName,
      email,
      phone,
      message,
      userId,
    })

    const result: PostContactMessageResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }
}
