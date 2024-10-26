import { Injectable } from '@nestjs/common'

import { PostTokenData } from '@boilerplate/types/auth/interfaces/token'

import { ProfileEntity } from '@boilerplate/back-end/modules/auth/entities/profile.entity'

@Injectable()
export class TokensDataMapper {
  toRegistrationProfile(
    data: PostTokenData,
    encryptedPassword: string,
  ): Omit<ProfileEntity, 'id' | 'roles' | 'createdAt' | 'updatedAt'> {
    const { firstName, lastName, email, phone } = data

    return {
      firstName,
      lastName,
      email,
      phone,
      password: encryptedPassword,
    }
  }
}
