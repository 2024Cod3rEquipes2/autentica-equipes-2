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
  ForbiddenException,
} from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  ChangePassowrd,
  CredentialsInvalid,
  Login,
  RecoverPassowrd,
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
import { NodeMailEmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly dbService: TypeOrmService,
    private readonly cryptographyService: CryptographyBcryptService,
    private readonly hasherService: HasherJWTService<TokenInfo>,
    private readonly emailService: NodeMailEmailService,
  ) {}

  mapException(err) {
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
    if (err instanceof CredentialsInvalid) {
      throw new UnauthorizedException(err.code);
    }
    throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
  }

  async getAuthorizationHeader(request: Request): Promise<TokenInfo> {
    if (!request.headers['authorization']) {
      throw new ForbiddenException('MISSING_AUTHORIZATION_HEADER');
    }
    try {
      const tokenDecoded = await this.hasherService.decode(
        request.headers['authorization'] as string,
      );
      return tokenDecoded;
    } catch (err) {
      throw new ForbiddenException('INVALID_AUTHORIZATION_HEADER');
    }
  }

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
      this.mapException(err);
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
      this.mapException(err);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('change-password')
  async ChangePassowrd(
    @Body() body: ChangePasswordDto,
    @Req() request: Request,
  ) {
    const { userId } = await this.getAuthorizationHeader(request);
    try {
      const useCase = new ChangePassowrd(
        this.dbService,
        this.cryptographyService,
      );
      await useCase.handle({
        confirmPassword: body.confirmPassword,
        lastPassword: body.lastPassword,
        password: body.password,
        userId: userId,
      });

      return 'PASSWORD_CHANGED_SUCCESSFULLY';
    } catch (err) {
      this.mapException(err);
    }
    if (!body.password) {
      throw new BadRequestException('REQUIRED_FIELD_PASSWORD');
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('recover-password')
  async RecoverPassowrd(@Query('email') email: string) {
    try {
      const useCase = new RecoverPassowrd(
        this.dbService,
        this.cryptographyService,
        this.emailService,
      );
      await useCase.handle({
        email: email,
      });
      return 'RECOVER_PASSWORD_SUCCESSFULLY';
    } catch (err) {
      this.mapException(err);
    }
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
      this.mapException(err);
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
    return this.emailService.sendEmail({
      to: 'josemicael16@hotmail.com',
      subject: 'Some Subject',
      text: 'Some Text',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('user')
  async GetUser(@Req() request: Request) {
    const tokenDecoded = await this.hasherService.decode(
      request.headers['authorization'] as string,
    );
    const { userId } = tokenDecoded;
    return await this.dbService.getById(userId);
  }
}
