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
import { TypeOrmUserRepository } from 'src/db/typeorm-user-repository.service';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { AuthHeader } from 'src/authHeader/authHeader.service';

@Controller('update')
export class UpdateController {
  constructor(
    private readonly TypeOrmUserRepository: TypeOrmUserRepository,
    private readonly hasherJWTService: HasherJWTService<any>,
    private readonly authHeader: AuthHeader,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Put('name')
  async updateName(
    @Body() updateUserNameDto: UpdateUserNameDto,
    @Req() request: Request,
  ) {
    try {
      const updateNameUseCase = new UpdateName(
        this.TypeOrmUserRepository,
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
      throw new InternalServerErrorException(`INTERNAL_SERVER_ERROR`);
    }
  }
}
