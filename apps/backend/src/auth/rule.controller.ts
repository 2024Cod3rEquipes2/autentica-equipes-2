import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Patch,
  Get,
  Delete,
  Query,
} from '@nestjs/common';

import { TypeOrmUserRepository } from 'src/db/typeorm-user-repository.service';
import {
  mapException,
  getAuthorizationHeader,
} from 'src/utils/nest-reponse-utils';
import { AthorizedUseCase, GetAllRules, Rule, TokenInfo } from 'src/core/auth';
import { TypeOrmGroupRepository } from 'src/db/typeorm-group-repository.service';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { TypeOrmRulesRepository } from 'src/db/typeorm-rule-repository.service';

@Controller('auth/rule')
export class RuleController {
  constructor(
    private readonly userRepository: TypeOrmUserRepository,
    private readonly groupRepository: TypeOrmGroupRepository,
    private readonly ruleRepository: TypeOrmRulesRepository,
    private readonly hasherService: HasherJWTService<TokenInfo>,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('get-all-rules')
  async getAll(@Req() request: Request) {
    const authHeader = await getAuthorizationHeader(
      this.hasherService,
      request,
    );
    try {
      const useCase = new AthorizedUseCase<void, Rule[]>(
        this.userRepository,
        this.groupRepository,
        new GetAllRules(this.ruleRepository),
        [],
      );
      return await useCase.handle({
        userId: authHeader.userId,
        data: undefined,
      });
    } catch (err) {
      mapException(err);
    }
  }
}
