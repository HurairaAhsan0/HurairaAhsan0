import * as Mongoose from 'mongoose';

export interface User {
  id: string;
  userName: string;
  password: string;
}

export const UserSchema = new Mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
});
