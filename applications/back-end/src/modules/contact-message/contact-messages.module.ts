import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'

import { ContactMessageEntity } from '@boilerplate/back-end/modules/contact-message/entities/contact-message.entity'

import { ContactMessagesRepository } from '@boilerplate/back-end/modules/contact-message/repositories/contact-messages.repository'

import { ContactMessageController } from '@boilerplate/back-end/modules/contact-message/controllers/contact-message.controller'

import { ContactMessagesService } from '@boilerplate/back-end/modules/contact-message/services/contact-messages.service'

import { ContactMessagesDataMapper } from '@boilerplate/back-end/modules/contact-message/data-mappers/contact-messages.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessageEntity]), forwardRef(() => AuthModule)],
  controllers: [ContactMessageController],
  providers: [ContactMessagesDataMapper, ContactMessagesRepository, ContactMessagesService],
  exports: [],
})
export class ContactMessageModule {}
