import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'Email must not be empty!' })
  @IsEmail({}, { message: 'Invalid email format!' })
  email: string;

  @IsNotEmpty({ message: 'Password must not be empty!' })
  @MinLength(5, { message: 'Password must be longer than 5 characters!' })
  password: string;
}
