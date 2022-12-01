import * as Mongoose from 'mongoose';

export class User {
  id: string;
  email: string;
  password: string;
  salt: string;
}

export const UserSchema = new Mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});
