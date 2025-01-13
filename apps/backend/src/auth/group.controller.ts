import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';

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
import { TypeOrmRulesRepository } from 'src/db/typeorm-rule-repository.service';

@Controller('auth/group')
export class GroupController {
  constructor(
    private readonly userRepository: TypeOrmUserRepository,
    private readonly groupRepository: TypeOrmGroupRepository,
    private readonly ruleRepository: TypeOrmRulesRepository,
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
        this.groupRepository,
        new AddGroup(this.groupRepository, this.ruleRepository),
        ['add-group'],
      );
      await useCase.handle({
        userId: authHeader.userId,
        data: {
          name: body.name,
          rules: body.rules,
        },
      });
      return 'SUCCESS';
    } catch (err) {
      mapException(err);
    }
  }
}
