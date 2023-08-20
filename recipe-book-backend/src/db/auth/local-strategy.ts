import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../users/auth.service';
// Import your auth service

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('localStrategy');
    super({ email: 'email' });
  }

  async validate(email: string, password: string) {
    console.log('hey');
    const user = await this.authService.validateUser(email, password);
    console.log('local', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
