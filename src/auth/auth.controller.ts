import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/sign-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('/signUp')
  async signup(@Body() SignUpDto: SignUpDto): Promise<void> {
    return await this.AuthService.signup(SignUpDto);
  }
  @Post('/signIn')
  async signin(@Body() SignInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.AuthService.signin(SignInDto);
  }
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() Req) {
    console.log(Req.user);
  }
}
