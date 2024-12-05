import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  CredentialsInvalid,
  Login,
  RegisterUser,
  RequiredField,
  TokenInfo,
  UserAlreadyRegistered,
  UserNotFound,
} from '../core/auth';
import { TypeOrmService } from 'src/db/typeorm.service';
import { CryptographyBcryptService } from 'src/cryptography/cryptography-bcrypt.service';
import { LoginDto } from './dto/login.dto';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly dbService: TypeOrmService,
    private readonly cryptographyService: CryptographyBcryptService,
    private readonly hasherService: HasherJWTService<TokenInfo>,
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

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() LoginDto: LoginDto) {
    try {
      const useCase = new Login(
        this.dbService,
        this.cryptographyService,
        this.hasherService,
      );
      return await useCase.handle({
        email: LoginDto.email,
        password: LoginDto.password,
      });
    } catch (err) {
      if (err instanceof CredentialsInvalid) {
        return new UnauthorizedException(err.code);
      }
      if (err instanceof RequiredField) {
        return new BadRequestException(err.code);
      }
      return new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }
}
