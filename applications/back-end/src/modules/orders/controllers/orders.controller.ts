import { Body, Controller, Get, Logger, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtPassportAuthGuard } from 'src/modules/auth/guards/jwt-passport.guard'

import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  GetOrderAdminHttpServerRequestDto,
  GetOrderAdminUrl,
  GetOrderAuthorizedHttpServerRequestDto,
  GetOrderAuthorizedUrl,
  GetOrderUnauthorizedUrl,
  GetOrdersListAdminHttpServerRequestDto,
  GetOrdersListAdminUrl,
  GetOrdersListUrl,
  GetOrdersParamsDto,
  GetOrdersSearchDto,
  GetUserOrdersListHttpServerRequestDto,
  GetUserOrdersListUrl,
  PatchOrderAdminHttpServerRequestDto,
  PatchOrderAdminUrl,
  PatchOrderAuthorizedHttpServerRequestDto,
  PatchOrderAuthorizedUrl,
  PatchOrderDataDto,
  PatchOrderStatusDto,
  PatchOrderStatusUrl,
  PatchOrderUnauthorizedUrl,
  PatchOrderUserAuthorizedUrl,
  PatchOrderUserDataDto,
  PatchOrderUserUnauthorizedUrl,
  PostOrderAuthorizedUrl,
  PostOrderAuthorizedUrlHttpServerRequestDto,
  PostOrderDataDto,
  PostOrderUnauthorizedUrl,
} from '@boilerplate/types/orders/dto/requests/orders'
import {
  GetOrderHttpResponseDto,
  GetOrdersHttpListResponseDto,
  GetOrdersHttpResponseDto,
  GetUserOrdersListHttpServerResponseDto,
  PatchOrderResultHttpResponseDto,
  PatchOrderStatusHttpServerResponseDto,
  PostOrderResultHttpResponseDto,
} from '@boilerplate/types/orders/dto/responses/orders'

import { OrdersService } from '@boilerplate/back-end/modules/orders/services/orders.service'

@Controller()
@ApiTags('Orders')
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name)

  constructor(private readonly ordersService: OrdersService) {}

  @Get(GetOrdersListUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async getOrderList(@Query() queries: GetOrdersSearchDto): Promise<GetOrdersHttpListResponseDto> {
    const { page, pageSize } = queries

    this.logger.log({
      controller: OrdersController.name,
      action: `${OrdersController.name}.getOrderList`,
      queries: {
        page,
        pageSize,
      },
    })

    return await this.ordersService.getOrdersList({ page, pageSize })
  }

  @Post(PostOrderUnauthorizedUrl)
  async postOrderUnauthorized(): Promise<PostOrderResultHttpResponseDto> {
    this.logger.log({
      controller: OrdersController.name,
      action: `${OrdersController.name}.postOrderUnauthorized`,
    })

    return await this.ordersService.postOrder()
  }

  @Post(PostOrderAuthorizedUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async postOrder(
    @Request() request: PostOrderAuthorizedUrlHttpServerRequestDto,
    @Body() body: PostOrderDataDto,
  ): Promise<PostOrderResultHttpResponseDto> {
    const {
      user: { gid: userGid },
    } = request
    const { force } = body

    this.logger.log({
      controller: OrdersController.name,
      action: `${OrdersController.name}.postOrder`,
      body: {
        force,
      },
    })

    return await this.ordersService.postOrder(userGid, force)
  }

  @Get(GetOrderUnauthorizedUrl)
  async getOrderUnauthorized(@Param('orderId') orderId: string): Promise<GetOrderHttpResponseDto> {
    this.logger.log({
      controller: OrdersController.name,
      action: `${OrdersController.name}.getOrderUnauthorized`,
      params: {
        orderId,
      },
    })

    return await this.ordersService.getOrder(orderId)
  }

  @Get(GetOrderAuthorizedUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async getOrderAuthorized(
    @Request() request: GetOrderAuthorizedHttpServerRequestDto,
    @Param('orderId') orderId: string,
  ): Promise<GetOrderHttpResponseDto> {
    const {
      user: { gid: userGid },
    } = request

    this.logger.log({
      controller: OrdersController.name,
      action: `${OrdersController.name}.getOrderAuthorized`,
      params: {
        orderId,
      },
    })

    return await this.ordersService.getOrder(orderId, userGid)
  }

  @Get(GetOrderAdminUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async getOrderAdmin(
    @Request() request: GetOrderAdminHttpServerRequestDto,
    @Param('orderId') orderId: string,
  ): Promise<GetOrderHttpResponseDto> {
    this.logger.log({
      controller: OrdersController.name,
      action: `${OrdersController.name}.getOrderAdmin`,
      params: {
        orderId,
      },
    })

    return await this.ordersService.getOrder(orderId, 'all')
  }

  @Get(GetOrdersListAdminUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async getOrdersAdmin(
    @Request() request: GetOrdersListAdminHttpServerRequestDto,
    @Query() queries: GetOrdersParamsDto,
  ): Promise<GetOrdersHttpResponseDto> {
    const { status } = queries

    return await this.ordersService.getOrdersListAdmin(status)
  }

  @Get(GetUserOrdersListUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin, Role.User])
  async addUserOrder(
    @Request() request: GetUserOrdersListHttpServerRequestDto,
  ): Promise<GetUserOrdersListHttpServerResponseDto> {
    const {
      user: { gid: userGid },
    } = request

    return await this.ordersService.getUserOrdersList(userGid)
  }

  @Patch(PatchOrderUnauthorizedUrl)
  async patchOrderUnauthorized(
    @Param('orderId') orderId: string,
    @Body() body: PatchOrderDataDto,
  ): Promise<PatchOrderResultHttpResponseDto> {
    const { productId, quantity } = body

    this.logger.log({
      controller: OrdersController.name,
      action: `${OrdersController.name}.patchOrderUnauthorized`,
      params: {
        orderId,
      },
    })

    return await this.ordersService.patchOrder(orderId, { productId, quantity })
  }

  @Patch(PatchOrderAuthorizedUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async patchOrderAuthorized(
    @Request() request: PatchOrderAuthorizedHttpServerRequestDto,
    @Param('orderId') orderId: string,
    @Body() body: PatchOrderDataDto,
  ): Promise<PatchOrderResultHttpResponseDto> {
    const {
      user: { gid: userGid },
    } = request
    const { productId, quantity } = body

    this.logger.log({
      controller: OrdersController.name,
      action: `${OrdersController.name}.patchOrderAuthorized`,
      params: {
        orderId,
      },
    })

    return await this.ordersService.patchOrder(orderId, { productId, quantity }, userGid)
  }

  @Patch(PatchOrderAdminUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async patchOrderAdmin(
    @Request() request: PatchOrderAdminHttpServerRequestDto,
    @Param('orderId') orderId: string,
    @Body() body: PatchOrderDataDto,
  ): Promise<PatchOrderResultHttpResponseDto> {
    const { productId, quantity } = body

    this.logger.log({
      controller: OrdersController.name,
      action: `${OrdersController.name}.patchOrderAdmin`,
      params: {
        orderId,
      },
    })

    return await this.ordersService.patchOrder(orderId, { productId, quantity }, 'all')
  }

  @Patch(PatchOrderUserUnauthorizedUrl)
  async patchOrderUserUnauthorized(
    @Param('orderId') orderId: string,
    @Body() data: PatchOrderUserDataDto,
  ): Promise<PatchOrderResultHttpResponseDto> {
    const { firstName, lastName, email, phone, paymentType } = data

    return await this.ordersService.patchOrderUserData(orderId, { firstName, lastName, email, phone, paymentType })
  }

  @Patch(PatchOrderUserAuthorizedUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async patchOrderUserAuthorized(
    @Request() request: PatchOrderAuthorizedHttpServerRequestDto,
    @Param('orderId') orderId: string,
    @Body() data: PatchOrderUserDataDto,
  ): Promise<PatchOrderResultHttpResponseDto> {
    const { firstName, lastName, email, phone, paymentType } = data
    const {
      user: { gid: userGid },
    } = request

    return await this.ordersService.patchOrderUserData(
      orderId,
      { firstName, lastName, email, phone, paymentType },
      userGid,
    )
  }

  @Patch(PatchOrderStatusUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async patchOrderStatus(
    @Param('orderId') orderId: string,
    @Body() body: PatchOrderStatusDto,
  ): Promise<PatchOrderStatusHttpServerResponseDto> {
    const { paymentStatus } = body

    return await this.ordersService.patchOrderStatus(orderId, { paymentStatus })
  }
}
