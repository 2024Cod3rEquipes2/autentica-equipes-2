import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  RegisterUser,
  RequiredField,
  UserAlreadyRegistered,
} from '../core/auth';
import { TypeOrmService } from 'src/db/typeorm.service';
import { CryptographyBcryptService } from 'src/cryptography/cryptography-bcrypt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly dbService: TypeOrmService,
    private readonly cryptographyService: CryptographyBcryptService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() params: RegisterDto) {
    try {
      const useCase = new RegisterUser(
        this.dbService,
        this.cryptographyService,
      );
      const user = await useCase.handle({
        email: params.email,
        password: params.password,
      });
      return {
        id: user.id,
        email: user.email,
      };
    } catch (err) {
      if (err instanceof UserAlreadyRegistered) {
        return new ConflictException(err.code);
      }
      if (err instanceof RequiredField) {
        return new BadRequestException(err.code);
      }
      return new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() LoginDto: LoginDto) {
  //   // return this.authService.login(LoginDto);
  // }
}
