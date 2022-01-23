import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';
import { Public } from '../decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserExistGuard } from '../users/users.guard';
import { RegisterDto, LoginDto, ServiceDto } from './auth.dto';
import { UserService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login user' })
  @Public()
  @Post('/login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Register new user' })
  @Public()
  @UseGuards(UserExistGuard)
  @Post('/register')
  async addUser(@Body() registerDto: RegisterDto) {
    console.log(registerDto, 'registerDto');
    const res = await this.authService.register(registerDto);

    return res;
  }

  @ApiTags('Auth')
  @ApiOperation({
    summary: 'Sign-in / sign-up with service like google or apple',
  })
  @Public()
  @UseGuards(UserExistGuard)
  @Post('/service')
  async addUserWithService(@Body() serviceDto: ServiceDto) {
    console.log(serviceDto, 'serviceDto');
    return 'WIP';
  }

  @ApiTags('Auth')
  @ApiOperation({
    summary: 'Forgot password',
  })
  @Public()
  @UseGuards(UserExistGuard)
  @Post('/forgotPassword')
  async forgotPassword(@Body() serviceDto: ServiceDto) {
    console.log(serviceDto, 'serviceDto');
    return 'WIP';
  }
}
