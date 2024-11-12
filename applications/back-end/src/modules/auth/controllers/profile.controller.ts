import { Body, Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import {
  GetProfileMyHttpServerRequestDto,
  GetProfileMyParamsDto,
  GetProfileMyUrl,
} from '@boilerplate/types/auth/dto/requests/profile'
import { GetProfileMyHttpServerResponseDto } from '@boilerplate/types/auth/dto/responses/profile/get-profile-my-response.dto'

import { PatchProfileMyUrl, PatchProfileMyHttpServerRequestDto, PatchProfileMyParamsDto } from '@boilerplate/types/auth/dto/requests/profile/patch-edit-profile-request.dto'
import { PatchProfileMyHttpServerResponseDto, EditProfileDto } from '@boilerplate/types/auth/dto/responses/profile/patch-edit-profile-response.dto'

import { JwtPassportAuthGuard } from '@boilerplate/back-end/modules/auth/guards/jwt-passport.guard'

import { ProfileService } from '@boilerplate/back-end/modules/auth/services/profile.service'

@Controller()
@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtPassportAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

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

  @Patch(PatchProfileMyUrl)
  async updateProfile(
    @Request() request: PatchProfileMyHttpServerRequestDto,
    @Body() updateProfileDto: PatchProfileMyParamsDto,
  ): Promise<PatchProfileMyHttpServerResponseDto> {

    const {
      user: { gid: userGid },
    } = request;

    return await this.profileService.updateMyProfile(userGid, updateProfileDto);
  }
}
