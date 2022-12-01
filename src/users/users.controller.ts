import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from './users.service';
import { User } from './Users.model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Userdto } from './User.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('User') //"tasks" tells as any incoming request to /tasks handled by this
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await (
      await this.UsersService.getAllUsers()
    ).map((prod) => ({
      id: prod.id,
      userName: prod.userName,
      password: prod.password,
    }));
  }
  @Get('/:id')
  GetUserById(@Param('id') id: string) {
    return this.UsersService.GetUserById(id);
  }
  @Post()
  async createUser(
    @Body() Userdto: Userdto,
    // @Body('title') title: string,
    // @Body('description') description: string,
  ): Promise<User> {
    return await this.UsersService.createUser(Userdto);
  }
  @Delete('/:id')
  async DeleteUser(@Param('id') id: string) {
    await this.UsersService.DeleteUser(id);
    return null;
  }
  @Patch('/:id/:userName')
  async UpdateUser(
    @Param('id') id: string,
    @Body('userName') userName: string,
  ): Promise<User> {
    return await this.UsersService.UpdateUser(id, userName);
  }
}
