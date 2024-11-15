import { extname, resolve } from 'path'

import { Body, Controller, Get, Param, Patch, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import multer from 'multer'
import { v4 as uuid } from 'uuid'

import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  GetProfileMyHttpServerRequestDto,
  GetProfileMyParamsDto,
  GetProfileMyUrl,
} from '@boilerplate/types/auth/dto/requests/profile'
import {
  PatchProfileMyHttpServerRequestDto,
  PatchProfileMyParamsDto,
  PatchProfileMyUrl,
} from '@boilerplate/types/auth/dto/requests/profile/patch-edit-profile-request.dto'
import { GetProfileMyHttpServerResponseDto } from '@boilerplate/types/auth/dto/responses/profile/get-profile-my-response.dto'
import { PatchProfileMyHttpServerResponseDto } from '@boilerplate/types/auth/dto/responses/profile/patch-edit-profile-response.dto'

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

  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  @Patch(PatchProfileMyUrl)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, resolve(process.cwd(), 'uploads', 'products'))
        },
        filename: function (req, file, cb) {
          cb(null, `${uuid()}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        phone: { type: 'string' },
        statusText: { type: 'string' },
        favGames: {
          type: 'array',
          items: { type: 'string' },
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateProfile(
    @Request() request: PatchProfileMyHttpServerRequestDto,
    @Body() params: PatchProfileMyParamsDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PatchProfileMyHttpServerResponseDto> {
    const {
      user: { gid: userGid },
    } = request

    const { firstName, lastName, phone, favGames, statusText } = params

    return await this.profileService.updateMyProfile(userGid, {
      firstName,
      lastName,
      phone,
      favGames,
      statusText,
      file,
    })
  }
}
