import { Injectable } from '@nestjs/common'

import { MyProfile } from '@boilerplate/types/auth/interfaces/profile'

import { ProfileEntity } from '@boilerplate/back-end/modules/auth/entities/profile.entity'

@Injectable()
export class ProfileDataMapper {
  toMyProfile(entity: ProfileEntity): MyProfile {
    const { id, firstName, lastName, email, phone } = entity

    return {
      id,
      firstName,
      lastName,
      email,
      phone,
    }
  }
}
