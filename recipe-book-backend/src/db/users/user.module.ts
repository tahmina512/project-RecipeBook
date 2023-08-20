import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.services';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../auth/local-strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, LocalStrategy], // Include UserService in providers
  exports: [UserService],
})
export class UserModule {}
