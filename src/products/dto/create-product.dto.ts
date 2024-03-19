import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title can not be blank!' })
  @IsString({ message: 'Title must be string!' })
  title: string;

  @IsNotEmpty({ message: 'Description can not be blank!' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Price can not be empty!' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number & max decimal precission 2!' },
  )
  @IsPositive({ message: 'Price should be positive number!' })
  price: number;

  @IsNotEmpty({ message: 'Stock can not be empty!' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price should be positive number!' })
  stock: number;

  @IsNotEmpty({ message: 'Images can not be empty!' })
  @IsArray({ message: 'Images should be in array format!' })
  images: string[];

  @IsNotEmpty({ message: 'Category can not be empty!' })
  @IsNumber({}, { message: 'Category ID must be a number' })
  categoryId: number;
}
