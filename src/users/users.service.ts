import { Injectable } from '@nestjs/common';
import { Userdto } from './User.dto';
import { User } from './Users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly taskModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    const res = await this.taskModel.find().exec();
    return res;
  }
  async GetUserById(id: string): Promise<User> {
    const task = await this.taskModel.findById(id);

    return {
      id: task.id,
      userName: task.userName,
      password: task.password,
    };
  }
  async createUser(Userdto: Userdto): Promise<User> {
    const { userName, password } = Userdto;
    const task = new this.taskModel({
      userName,
      password,
    });
    const res = await task.save();
    return {
      id: res.id,
      userName: res.userName,
      password: res.password,
    };
  }
  async DeleteUser(id: string) {
    await this.taskModel.deleteOne({ _id: id }).exec();
    return null;
  }
  async UpdateUser(id: string, userName: string): Promise<User> {
    const update = await this.taskModel.findById(id);
    if (userName) {
      update.userName = userName;
    }
    const up = await update.save();
    return {
      id: up.id,
      userName: up.userName,
      password: up.password,
    };
  }
}
