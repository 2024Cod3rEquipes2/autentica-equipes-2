import {
  Controller,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  Put,
  Req,
  Post,
} from '@nestjs/common';
import {
  CredentialsInvalid,
  RequiredField,
  UserAlreadyRegistered,
  UserNotFound,
} from 'src/core/auth';
import { UpdateUserNameDto } from './dto/user-name-dto';
import { UpdateName } from 'src/update/use-cases/change-name';
import { request, Request } from 'express';
import { TypeOrmService } from 'src/db/typeorm.service';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { AuthHeader } from 'src/authHeader/authHeader.service';
import { ChangePassword } from './use-cases/change-password';
import { CryptographyBcryptService } from 'src/cryptography/cryptography-bcrypt.service';
import { ChangePasswordDto } from './dto/change-password-dto';
import { RecoverPassword } from './use-cases/recover-password';
import { RecoverPasswordDto } from './dto/recover-password-dto';
import { ResetPasswordDTO } from './dto/reset-password-dto';
import { ResetPassword } from './use-cases/reset-password';
import { error } from 'console';


@Controller('update')
export class UpdateController {
  constructor(
    private readonly typeOrmService: TypeOrmService,
    private readonly hasherJWTService: HasherJWTService<any>,
    private readonly authHeader: AuthHeader,
    private readonly cryptographyService: CryptographyBcryptService,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('name')
  async updateName(
    @Body() updateUserNameDto: UpdateUserNameDto,
    @Req() request: Request,
  ) {
    try {
      const updateNameUseCase = new UpdateName(
        this.typeOrmService,
        this.hasherJWTService,
        this.authHeader,
      );

      const updateResult = await updateNameUseCase.handle({
        request,
        newName: updateUserNameDto.newName,
      });

      return {
        userId: updateResult.userId,
        newName: updateResult.newName,
      };
    } catch (err) {
      console.error(err);
      if (err instanceof UserNotFound || err instanceof CredentialsInvalid) {
        throw new UnauthorizedException(err.code);
      }
      if (
        err instanceof RequiredField ||
        err instanceof UserAlreadyRegistered
      ) {
        throw new BadRequestException(err.code);
      }
      throw new InternalServerErrorException(
        `INTERNAL_SERVER_ERROR`,
        err.message || err.code,
      );
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('change-password')
  async  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() request: Request,
  ) {
    try {
      const changePasswordUseCase = new ChangePassword(
        this.typeOrmService,
        this.hasherJWTService,
        this.authHeader,
        this.cryptographyService,
      );

      const updateResult = await changePasswordUseCase.handle({
        request,
        newPassword: changePasswordDto.password,
        confirmPassword: changePasswordDto.confirmPassword
      });

      return {
        userId: updateResult.userId,
      };
    } catch (err) {
      console.error(err);
      if (err instanceof UserNotFound || err instanceof CredentialsInvalid) {
        throw new UnauthorizedException(err.code);
      }
      if (
        err instanceof RequiredField ||
        err instanceof UserAlreadyRegistered
      ) {
        throw new BadRequestException(err.code);
      }
      throw new InternalServerErrorException(
        `INTERNAL_SERVER_ERROR`,
        err.message || err.code,
      );
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('recover-password')
  async  recoverPassword(
    @Body() recoverPasswordDto: RecoverPasswordDto,
  ) {
    try {
      const recoverPasswordUseCase = new RecoverPassword(
        this.typeOrmService,
        this.cryptographyService,
      );

      const updateResult = await  recoverPasswordUseCase.handle({
    
        email: recoverPasswordDto.email,

      });

      return {
        userId: updateResult.userId,
      };
    } catch (err) {
      console.error(err);
      if (err instanceof UserNotFound || err instanceof CredentialsInvalid) {
        throw new UnauthorizedException(err.code);
      }
      if (
        err instanceof RequiredField ||
        err instanceof UserAlreadyRegistered
      ) {
        throw new BadRequestException(err.code);
      }
      throw new InternalServerErrorException(
        `INTERNAL_SERVER_ERROR`,
        err.message || err.code,
      );
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('reset-password')
  async  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDTO,
    @Req() request: Request,
  ) {
    
    try {
      const resetPasswordUseCase = new ResetPassword(
        this.typeOrmService,
        this.cryptographyService,
        this.hasherJWTService,
        this.authHeader
      );

      const resetPassword = await  resetPasswordUseCase.handle({
        request,
        password: resetPasswordDto.password,
        confirmPassword: resetPasswordDto.confirmPassword,
        
      });
      console.log(resetPassword)

      return {
        userId: resetPassword.userId,

      };
    } catch (err) {
      console.log('30',err)
      console.error(err);
      if (err instanceof UserNotFound || err instanceof CredentialsInvalid) {
        throw new UnauthorizedException(err.code);
      }
      if (
        err instanceof RequiredField ||
        err instanceof UserAlreadyRegistered
      ) {
        throw new BadRequestException(err.code);
      }
      throw new InternalServerErrorException(
    
        `INTERNAL_SERVER_ERROR`,
        err.message || err.code,
  
      );
    }
  }
}
