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
  TokenInfo,
  UserAlreadyRegistered,
  ValidationError,
} from '../core/auth';
import { TypeOrmService } from 'src/db/typeorm.service';
import { CryptographyBcryptService } from 'src/cryptography/cryptography-bcrypt.service';
import { LoginDto } from './dto/login.dto';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { ChangePasswordDto } from '../update/dto/change-password-dto';
import { ResetPasswordDTO } from './dto/reset-password-dto';

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
        name: params.name,
        confirmPassword: params.confirmPassword,
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
      if (err instanceof RequiredField || err instanceof ValidationError) {
        throw new BadRequestException(err.code);
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

  @HttpCode(HttpStatus.OK)
  @Get('user')
  async GetUser(@Req() request: Request) {
    const tokenDecoded = await this.hasherService.decode(
      request.headers['authorization'] as string,
    );
    const { userId } = tokenDecoded;
    return await this.dbService.getUserById(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('change-password')
  async ChangePassowrd(
    @Body()  changePasswordDto: ChangePasswordDto,
    @Req() request: Request,
  ) {
    const tokenDecoded = await this.hasherService.decode(
      request.headers['authorization'] as string,
    );
    const { userId } = tokenDecoded;

    if (!changePasswordDto.password) {
      throw new BadRequestException('REQUIRED_FIELD_PASSWORD');
    }
    if (!changePasswordDto.confirmPassword) {
      throw new BadRequestException('REQUIRED_FIELD_CONFIRMPASSWORD');
    }

    if (changePasswordDto.password !== changePasswordDto.confirmPassword) {
      throw new BadRequestException('PASSWORDS_NOT_MATCH');
    }

    const user = await this.dbService.getUserById(userId);
    if (!user) {
      throw new BadRequestException('USER_NOT_FOUND');
    }
    const samePassord = await this.cryptographyService.compare(
      changePasswordDto.lastPassword,
      user.password,
    );
    if (!samePassord) {
      throw new BadRequestException('LAST_PASSWORD_IS_NOT_VALID');
    }
    const newPasswordEncrypted = await this.cryptographyService.encrypt(
      changePasswordDto.password,
    );

    user.password = newPasswordEncrypted;

    this.dbService.updateUser(user);
    return 'PASSWORD_CHANGED_SUCCESSFULLY';
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('recover-password')
  async RecoverPassowrd(@Query('email') email: string) {
    try {
      console.log(email);
      if (!email) {
        throw new Error('REQUIRED_FIELD_EMAIL');
      }
      const user = await this.dbService.getUserByEmail(email);
      if (!user) {
        throw new Error('USER_NOT_FOUND');
      }
      const recoverToken = await this.cryptographyService.encrypt(
        JSON.stringify({ userId: user.id, email: user.email }),
      );
      user.recoverToken = recoverToken;
      // user.name = recoverToken;
      this.dbService.updateUser(user);
      console.log(recoverToken);
    } catch (err) {
      console.log(err);
    }
    return 'RECOVER_PASSWORD_SUCCESSFULLY';
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('reset-password')
  async ResetPassowrd(@Body() body: ResetPasswordDTO) {
    if (!body.password) {
      throw new BadRequestException('REQUIRED_FIELD_PASSWORD');
    }
    if (!body.confirmPassword) {
      throw new BadRequestException('REQUIRED_FIELD_CONFIRMPASSWORD');
    }

    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('PASSWORDS_NOT_MATCH');
    }

    const user = await this.dbService.getByRecoverToken(body.recoverToken);
    if (!user) {
      throw new BadRequestException('TOKEN_NOT_VALID');
    }
    const newPasswordEncrypted = await this.cryptographyService.encrypt(
      body.password,
    );

    user.password = newPasswordEncrypted;
    user.recoverToken = null;

    this.dbService.updateUser(user);
    return 'PASSWORD_CHANGED_SUCCESSFULLY';
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
}
