import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import {
  GetProfileMyHttpServerRequestDto,
  GetProfileMyParamsDto,
  GetProfileMyUrl,
} from '@boilerplate/types/auth/dto/requests/profile/get-profile-my-request.dto'
import { GetProfileMyHttpServerResponseDto } from '@boilerplate/types/auth/dto/responses/profile/get-profile-my-response.dto'

import { JwtPassportAuthGuard } from '@boilerplate/back-end/modules/auth/guards/jwt-passport.guard'

import { ProfileService } from '@boilerplate/back-end/modules/auth/services/profile.service'

@Controller()
@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtPassportAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(GetProfileMyUrl)
  async profile(
    @Request() request: GetProfileMyHttpServerRequestDto,
    @Param() params: GetProfileMyParamsDto,
  ): Promise<GetProfileMyHttpServerResponseDto> {
    const {
      user: { gid: userGid },
    } = request

    const { role } = params

    return await this.profileService.getMyProfile(userGid, role)
  }
}
