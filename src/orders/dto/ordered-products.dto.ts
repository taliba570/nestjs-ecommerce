import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderedProductsDto {
  @IsNotEmpty({ message: 'ID can not be empty!' })
  id: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price should be a number and max decimal precission is 2!' },
  )
  @IsPositive({ message: 'Price must be positive' })
  productUnitPrice: number;

  @IsNumber({}, { message: 'Quantity should be number!' })
  @IsPositive({ message: 'Quantity can not be negative!' })
  productQuantity: number;
}
