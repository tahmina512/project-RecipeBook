import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.services';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../auth/local-strategy';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    private localStrategy: LocalStrategy,
  ) {}
  @Post('signup')
  async addUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const userInfo = await this.userService.createUser(email, password);
    return userInfo;
  }
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log('body', email, password);
    try {
      return await this.localStrategy.validate(email, password);
    } catch (error) {
      throw new HttpException(
        { message: 'Wrong_Password_or_Username' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
