import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TypeOrmUserRepository } from './typeorm-user-repository.service';
import { Group } from './entities/group.entity';
import { Rule } from './entities/rule.entity';
import { TypeOrmGroupRepository } from './typeorm-group-repository.service';
import { TypeOrmRulesRepository } from './typeorm-rule-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Rule])],
  providers: [
    TypeOrmUserRepository,
    TypeOrmGroupRepository,
    TypeOrmRulesRepository,
  ],
  exports: [
    TypeOrmUserRepository,
    TypeOrmGroupRepository,
    TypeOrmRulesRepository,
  ],
})
export class DbModule {}
