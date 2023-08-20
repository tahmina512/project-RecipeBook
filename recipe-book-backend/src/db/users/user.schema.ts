import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Schema()
export class Users extends Document {
  @Prop({ required: true, unique: true }) // Set the required option to true
  email: string;

  @Prop({ required: true }) // Set the required option to true
  password: string;
  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(Users);
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    next();
  }
});
