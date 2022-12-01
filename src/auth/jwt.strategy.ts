import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './auth.model';
import { jwtPlayLoad } from './dto/jwt-credential.dto';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('auth') private readonly UserModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }
  async validate(payload: jwtPlayLoad) {
    const { email } = payload;
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
