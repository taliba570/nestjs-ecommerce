import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Title must not be empty!' })
  @IsString({ message: 'Title should be string!' })
  title: string;

  @IsNotEmpty({ message: 'Description must not be empty!' })
  @IsString({ message: 'Description should be string!' })
  description: string;
}
