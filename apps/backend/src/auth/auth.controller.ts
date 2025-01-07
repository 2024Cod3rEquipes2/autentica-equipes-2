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
  Get,
  Req,
  Query,
  Delete,
} from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  CredentialsInvalid,
  Login,
  RegisterUser,
  RequiredField,
  ResetPassowrd,
  TokenInfo,
  UserAlreadyRegistered,
  ValidationError,
} from '../core/auth';
import { TypeOrmService } from 'src/db/typeorm.service';
import { CryptographyBcryptService } from 'src/cryptography/cryptography-bcrypt.service';
import { LoginDto } from './dto/login.dto';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { ChangePasswordDto } from './dto/change-password-dto';
import { ResetPasswordDTO } from './dto/reset-password-dto';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly dbService: TypeOrmService,
    private readonly cryptographyService: CryptographyBcryptService,
    private readonly hasherService: HasherJWTService<TokenInfo>,
    private readonly emailService: EmailService,
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
        name: params.name,
        confirmPassword: params.confirmPassword,
        phoneNumber: params.phoneNumber,
      });
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    } catch (err) {
      if (err instanceof UserAlreadyRegistered) {
        throw new ConflictException(err.code);
      }
      if (err instanceof RequiredField) {
        throw new BadRequestException({
          code: err.code,
          field: err.field,
        });
      }
      if (err instanceof ValidationError) {
        throw new BadRequestException({
          code: err.code,
          field: err.code,
        });
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
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
        throw new UnauthorizedException(err.code);
      }
      if (err instanceof RequiredField) {
        throw new BadRequestException(err.code);
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('change-password')
  async ChangePassowrd(
    @Body() body: ChangePasswordDto,
    @Req() request: Request,
  ) {
    const tokenDecoded = await this.hasherService.decode(
      request.headers['authorization'] as string,
    );
    const { userId } = tokenDecoded;

    if (!body.password) {
      throw new BadRequestException('REQUIRED_FIELD_PASSWORD');
    }
    if (!body.confirmPassword) {
      throw new BadRequestException('REQUIRED_FIELD_CONFIRMPASSWORD');
    }

    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('PASSWORDS_NOT_MATCH');
    }

    const user = await this.dbService.getUserById(userId);
    if (!user) {
      throw new BadRequestException('USER_NOT_FOUND');
    }
    const samePassord = await this.cryptographyService.compare(
      body.lastPassword,
      user.password,
    );
    if (!samePassord) {
      throw new BadRequestException('LAST_PASSWORD_IS_NOT_VALID');
    }
    const newPasswordEncrypted = await this.cryptographyService.encrypt(
      body.password,
    );

    user.password = newPasswordEncrypted;

    this.dbService.updateUser(user);
    return 'PASSWORD_CHANGED_SUCCESSFULLY';
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('recover-password')
  async RecoverPassowrd(@Query('email') email: string) {
    console.log(email);
    if (!email) {
      throw new BadRequestException('REQUIRED_FIELD_EMAIL');
    }
    const user = await this.dbService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('USER_NOT_FOUND');
    }
    const recoverToken = await this.cryptographyService.encrypt(
      JSON.stringify({ userId: user.id, email: user.email }),
    );
    //  user.recoverToken = recoverToken;
    user.name = recoverToken;
    try {
      this.dbService.updateUser(user);
      await this.emailService.sendEmail(
        user.email,
        'Recover Password',
        'http://localhost:3000/reset-password?token=' + recoverToken,
      );
      console.log(recoverToken);
    } catch (err) {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
      console.log(err);
    }
    return 'RECOVER_PASSWORD_SUCCESSFULLY';
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('reset-password')
  async ResetPassowrd(@Body() body: ResetPasswordDTO) {
    try {
      const useCase = new ResetPassowrd(
        this.dbService,
        this.cryptographyService,
      );
      await useCase.handle({
        confirmPassword: body.confirmPassword,
        password: body.password,
        recoverToken: body.recoverToken,
      });
      return 'PASSWORD_CHANGED_SUCCESSFULLY';
    } catch (err) {
      if (err instanceof RequiredField) {
        throw new BadRequestException({
          code: err.code,
          field: err.field,
        });
      }
      if (err instanceof ValidationError) {
        throw new BadRequestException({
          code: err.code,
          field: err.code,
        });
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete-all')
  async DeleteAll() {
    return await this.dbService.deleteAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-all')
  async GetAll() {
    return await this.dbService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('test')
  async Test() {
    return this.emailService.sendEmail(
      'josemicael16@hotmail.com',
      'Some Subject',
      'Some Text',
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('user')
  async GetUser(@Req() request: Request) {
    const tokenDecoded = await this.hasherService.decode(
      request.headers['authorization'] as string,
    );
    const { userId } = tokenDecoded;
    return await this.dbService.getUserById(userId);
  }
}
