// import { Matches } from 'class-validator';

export class SignUpDto {
  email: string;

  // @Matches('^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$') //Minimum eight characters, at least one letter, one number and one special character
  password: string;
}
export class SignInDto {
  email: string;
  password: string;
}
