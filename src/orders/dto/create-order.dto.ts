import { Type } from 'class-transformer';
import { CreateShippingDto } from './create-shipping.dto';
import { ValidateNested } from 'class-validator';
import { CreateOrderedProductsDto } from './ordered-products.dto';

export class CreateOrderDto {
  @Type(() => CreateShippingDto)
  @ValidateNested()
  shippingAddress: CreateShippingDto;

  @Type(() => CreateOrderedProductsDto)
  @ValidateNested()
  orderedProducts: CreateOrderedProductsDto[];
}
