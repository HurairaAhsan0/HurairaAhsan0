import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInDto, SignUpDto } from './dto/sign-user.dto';
import { User } from './auth.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtPlayLoad } from './dto/jwt-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('auth') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(SignUpDto: SignUpDto): Promise<void> {
    const { email, password } = SignUpDto;
    const duplicate = await this.userModel.findOne({ email });
    if (duplicate) {
      throw new HttpException('ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
    }
    const user = new this.userModel();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.HashPassword(password, user.salt);
    await user.save();
  }

  async signin(SignInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = SignInDto;
    const user = await this.userModel.findOne({ email });
    const pass = await this.HashPassword(password, user.salt);
    if (user && pass === user.password) {
      //return credentails are ok
    } else {
      throw new HttpException('CREDENTIALS_WRONG', HttpStatus.BAD_REQUEST);
    }
    const payload: jwtPlayLoad = { email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  private HashPassword(password: string, salt: string): string {
    return bcrypt.hash(password, salt);
  }
}
