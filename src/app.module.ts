import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://ahsan:ahsan@cluster0.i3stuu3.mongodb.net/nestjs-crud-tasks?retryWrites=true&w=majority',
    ),
    UsersModule,
  ],
})
export class AppModule {}
