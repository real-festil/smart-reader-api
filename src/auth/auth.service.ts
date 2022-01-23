import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './auth.dto';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      console.log('user', user);

      const isValid = await bcrypt.compare(password, user.password);
      console.log('isValid', isValid);

      if (user && isValid) {
        return this.login(user);
      }
    }
    return { error: true, message: 'Incorrect email or password' };
  }

  async login(user: User) {
    return {
      ...user,
      access_token: this.jwtService.sign({ sub: user.id }),
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return { error: true, message: 'Email already in use' };
    }

    return await this.userService.addUser(username, email, password);
  }
}
