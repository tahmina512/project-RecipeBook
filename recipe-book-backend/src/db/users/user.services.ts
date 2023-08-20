import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly userModel: Model<Users>) {
    console.log('userservice');
  }

  async createUser(email: string, password: string) {
    const userExists = await this.userModel
      .findOne({
        email: email,
      })
      .exec();
    // console.log(userExist);
    if (!userExists) {
      console.log('dsdsds');
      const newUser = new this.userModel({
        email,
        password,
      });
      const result = await newUser.save();
      // console.log(result);
      return result;
    } else {
      console.log('User already exists'); // Log the message
      return null;
    }
  }
  async findbyEmail(email: string) {
    console.log("userservice",email);
    return this.userModel.findOne({ email });
  }
}
