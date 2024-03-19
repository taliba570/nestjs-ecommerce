import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Product should not be empty' })
  @IsNumber({}, { message: 'Product Id should be number' })
  productId: number;

  @IsNotEmpty({ message: 'Rating can not be empty' })
  @IsNumber({}, { message: 'Rating must be a number' })
  ratings: number;

  @IsNotEmpty({ message: 'Comment should not be empty!' })
  @IsString()
  comment: string;
}
