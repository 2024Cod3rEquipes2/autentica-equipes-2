import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Get,
  Req,
  Query,
  Delete,
} from '@nestjs/common';
import {
  ChangePassowrd,
  Login,
  RecoverPassowrd,
  RegisterUser,
  ResetPassowrd,
  TokenInfo,
} from '../core/auth';
import { TypeOrmUserRepository } from 'src/db/typeorm-user-repository.service';
import { CryptographyBcryptService } from 'src/cryptography/cryptography-bcrypt.service';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { NodeMailEmailService } from 'src/email/email.service';
import {
  getAuthorizationHeader,
  mapException,
} from 'src/utils/nest-reponse-utils';
import {
  ChangePasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
} from './DTO/auth.DTOs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly dbService: TypeOrmUserRepository,
    private readonly cryptographyService: CryptographyBcryptService,
    private readonly hasherService: HasherJWTService<TokenInfo>,
    private readonly emailService: NodeMailEmailService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() params: RegisterDTO) {
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
      mapException(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() LoginDTO: LoginDTO) {
    try {
      const useCase = new Login(
        this.dbService,
        this.cryptographyService,
        this.hasherService,
      );
      return await useCase.handle({
        email: LoginDTO.email,
        password: LoginDTO.password,
      });
    } catch (err) {
      mapException(err);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('change-password')
  async ChangePassowrd(
    @Body() body: ChangePasswordDTO,
    @Req() request: Request,
  ) {
    const { userId } = await getAuthorizationHeader(
      this.hasherService,
      request,
    );
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
      mapException(err);
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
      mapException(err);
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
      mapException(err);
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
  @Get('email-test')
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
