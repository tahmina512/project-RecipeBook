import { Injectable } from '@nestjs/common';
import { UserService } from './user.services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
    console.log('authService');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findbyEmail(email);
    console.log('authService', user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      console.log('result', result);
      return result;
    } else {
      console.log('not matched');
    }
  }
}
