import { Injectable } from '@nestjs/common'

import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'

import { GetContactMessage } from '@boilerplate/types/contact-message/interfaces/contact-message'
import {
  PostContactMessage,
  PostContactMessageResult,
} from '@boilerplate/types/contact-message/interfaces/contact-message'

import { ContactMessagesRepository } from '@boilerplate/back-end/modules/contact-message/repositories/contact-messages.repository'

import { ContactMessagesDataMapper } from '@boilerplate/back-end/modules/contact-message/data-mappers/contact-messages.data-mapper'

@Injectable()
export class ContactMessagesService {
  constructor(
    private readonly contactMessagesDataMapper: ContactMessagesDataMapper,

    private readonly contactMessagesRepository: ContactMessagesRepository,
  ) {}

  async getContactMessages(): Promise<HttpListServerResponse<GetContactMessage>> {
    const [data, total] = await this.contactMessagesRepository.findAndCount()

    return {
      result: data.map((contactMessage) => this.contactMessagesDataMapper.toContactMessage(contactMessage)),
      total,
    }
  }

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
