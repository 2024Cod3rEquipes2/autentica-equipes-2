import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

import { TypeOrmUserRepository } from 'src/db/typeorm-user-repository.service';
import {
  mapException,
  getAuthorizationHeader,
} from 'src/utils/nest-reponse-utils';
import {
  AddGroup,
  AddGroupParams,
  AthorizedUseCase,
  TokenInfo,
} from 'src/core/auth';
import { TypeOrmGroupRepository } from 'src/db/typeorm-group-repository.service';
import { AddGroupDTO } from './dto/add-group-dto';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';

@Controller('auth/group')
export class GroupController {
  constructor(
    private readonly userRepository: TypeOrmUserRepository,
    private readonly GroupRepository: TypeOrmGroupRepository,
    private readonly hasherService: HasherJWTService<TokenInfo>,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  async register(@Body() body: AddGroupDTO, @Req() request: Request) {
    const authHeader = await getAuthorizationHeader(
      this.hasherService,
      request,
    );
    try {
      const useCase = new AthorizedUseCase<AddGroupParams, void>(
        this.userRepository,
        this.GroupRepository,
        new AddGroup(this.GroupRepository),
        ['add-group'],
      );
      await useCase.handle({
        userId: authHeader.userId,
        data: {
          groupName: body.name,
          rules: body.rules,
        },
      });
      return 'SUCCESS';
    } catch (err) {
      mapException(err);
    }
  }
}
