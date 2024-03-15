import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'First Name must not be empty!' })
  firstName: string;

  @IsNotEmpty({ message: 'Last Name must not be empty!' })
  lastName: string;

  @IsNotEmpty({ message: 'Password must not be empty!' })
  @MinLength(5, { message: 'Password must be longer than 5 characters!' })
  password: string;

  @IsNotEmpty({ message: 'Email must not be empty!' })
  @IsEmail({}, { message: 'Invalid email format!' })
  email: string;
}
