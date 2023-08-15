import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Users {
  @Prop({ required: true }) // Set the required option to true
  email: string;

  @Prop({ required: true }) // Set the required option to true
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
