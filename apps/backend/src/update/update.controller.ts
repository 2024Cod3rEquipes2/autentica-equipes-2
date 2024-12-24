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
import { UpdateUserNameDto } from './dto/updateUserNameDto';
import { UpdateName } from 'src/update/use-cases/update-name';
import { Request } from 'express';
import { TypeOrmService } from 'src/db/typeorm.service';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { AuthHeader } from 'src/authHeader/authHeader.service';
import { ChangePasswordDto } from 'src/auth/dto/change-password-dto';
import { ChangePassword } from './use-cases/change-password';
import { CryptographyBcryptService } from 'src/cryptography/cryptography-bcrypt.service';


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
}
