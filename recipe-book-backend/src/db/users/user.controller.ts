import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.services';

@Controller('users')
export class UserController {
  //to add a new product
  constructor(private readonly userService: UserService) {}
  @Post()
  addUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ): any {
    const generatedId = this.userService.addUserInfo(email, password);
    return { id: generatedId };
  }
}
