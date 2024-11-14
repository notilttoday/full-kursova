import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtPassportAuthGuard } from 'src/modules/auth/guards/jwt-passport.guard'

import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  GetContactMessagesRequestUrl,
  PostContactMessageDataDto,
  PostContactMessageUrl,
} from '@boilerplate/types/contact-message/dto/requests/contact-messages'
import {
  GetContactMessagesHttpResponseDto,
  PostContactMessageHttpResponseDto,
} from '@boilerplate/types/contact-message/dto/responses/contact-messages'

import { ContactMessagesService } from '@boilerplate/back-end/modules/contact-message/services/contact-messages.service'

@Controller()
@ApiTags('ContactMessage')
export class ContactMessageController {
  constructor(private readonly contactMessageService: ContactMessagesService) {}

  @UseGuards(JwtPassportAuthGuard)
  @ApiBearerAuth()
  @Roles([Role.User])
  @Post(PostContactMessageUrl)
  async postContactMessage(@Body() data: PostContactMessageDataDto): Promise<PostContactMessageHttpResponseDto> {
    const { firstName, lastName, email, phone, message, userId } = data

    return await this.contactMessageService.postContactMessage({ firstName, lastName, email, phone, message, userId })
  }

  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  @Get(GetContactMessagesRequestUrl)
  async getProducts(): Promise<GetContactMessagesHttpResponseDto> {
    return await this.contactMessageService.getContactMessages()
  }
}
