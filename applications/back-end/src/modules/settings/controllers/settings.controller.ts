import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  GetSettingsRequestUrl,
  PatchSettingsDataDto,
  PatchSettingsRequestUrl,
} from '@boilerplate/types/settings/dto/requests/settings'
import { GetSettingsHttpResponseDto, PatchSettingsHttpResponseDto } from '@boilerplate/types/settings/dto/responses/settings'

import { JwtPassportAuthGuard } from '@boilerplate/back-end/modules/auth/guards/jwt-passport.guard'

import { SettingsService } from '@boilerplate/back-end/modules/settings/services/settings.service'

@Controller()
@UseGuards(JwtPassportAuthGuard)
@ApiTags('Settings')
@ApiBearerAuth()
@Roles([Role.Admin])
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(GetSettingsRequestUrl)
  async getSettings(): Promise<GetSettingsHttpResponseDto> {
    return await this.settingsService.getSettings()
  }

  @Patch(PatchSettingsRequestUrl)
  async patchSettings(@Body() data: PatchSettingsDataDto): Promise<PatchSettingsHttpResponseDto> {
    return await this.settingsService.patchSettings(data)
  }
}
