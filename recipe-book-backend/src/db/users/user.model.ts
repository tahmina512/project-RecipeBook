import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User {
  //   id: string;
  //   title: string;
  //   description: string;
  //   price: number;
  id:string,
  email: string;
  password: string;
}
