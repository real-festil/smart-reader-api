import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'email',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    type: 'string',
    description: 'Password',
    required: true,
  })
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({
    type: 'string',
    description: 'username',
    required: true,
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'email',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    type: 'string',
    description: 'Password',
    required: true,
  })
  password: string;
}

export class ServiceDto {
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({
    type: 'string',
    description: 'username',
    required: true,
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'email',
    required: true,
  })
  email: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({
    type: 'string',
    description: 'user id',
    required: true,
  })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'user data',
    required: true,
  })
  userData: RegisterDto;
}
