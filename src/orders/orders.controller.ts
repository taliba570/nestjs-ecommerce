import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Role } from 'src/utility/common/enums/Role.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<OrderEntity> {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderEntity> {
    return await this.ordersService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Role.ADMIN]))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.update(
      +id,
      updateOrderStatusDto,
      currentUser,
    );
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Role.ADMIN]))
  @Put('cancel/:id')
  async cancel(
    @Param('id') id: string,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.cancel(+id, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
