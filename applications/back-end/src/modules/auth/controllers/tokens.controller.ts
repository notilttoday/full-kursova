import { Body, Controller, Delete, Patch, Post, Put, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import {
  DeleteTokenHttpServerRequestDto,
  DeleteTokenUrl,
  PatchTokenHttpServerRequestDto,
  PatchTokenUrl,
  PostTokenDataDto,
  PostTokenUrl,
  PutTokenDataDto,
  PutTokenUrl,
} from '@boilerplate/types/auth/dto/requests/token'
import {
  DeleteTokenResultHttpServerResponseDto,
  PatchTokenResultHttpServerResponseDto,
  PostTokenResultHttpServerResponseDto,
  PutTokenResultHttpServerResponseDto,
} from '@boilerplate/types/auth/dto/responses/token'

import { JwtPassportLogoutAuthGuard } from '@boilerplate/back-end/modules/auth/guards/jwt-passport-logout-auth.guard'
import { JwtPassportRefreshAuthGuard } from '@boilerplate/back-end/modules/auth/guards/jwt-passport-refresh-auth.guard'

import { ProfileService } from '@boilerplate/back-end/modules/auth/services/profile.service'

@Controller()
@ApiTags('Token')
export class TokensController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Login
   */
  @Put(PutTokenUrl)
  async login(@Body() data: PutTokenDataDto): Promise<PutTokenResultHttpServerResponseDto> {
    return await this.profileService.login(data)
  }

  /**
   * Registration
   */
  @Post(PostTokenUrl)
  async registration(@Body() data: PostTokenDataDto): Promise<PostTokenResultHttpServerResponseDto> {
    return await this.profileService.registration(data)
  }

  /**
   * Refrash token
   */
  @Patch(PatchTokenUrl)
  @UseGuards(JwtPassportRefreshAuthGuard)
  @ApiBearerAuth()
  async refrashToken(
    @Request() request: PatchTokenHttpServerRequestDto,
  ): Promise<PatchTokenResultHttpServerResponseDto> {
    const { user } = request

    return await this.profileService.refreshToken(user)
  }

  /**
   * Logout
   */
  @Delete(DeleteTokenUrl)
  @UseGuards(JwtPassportLogoutAuthGuard)
  @ApiBearerAuth()
  async logout(@Request() request: DeleteTokenHttpServerRequestDto): Promise<DeleteTokenResultHttpServerResponseDto> {
    const { user } = request

    return await this.profileService.logout(request.headers.authorization, user)
  }
}
