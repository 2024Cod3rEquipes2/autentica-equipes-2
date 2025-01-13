import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Rule as RuleORM } from './entities/rule.entity';
import { Repository } from 'typeorm';
import { Rule, RulesRepository } from '../core/auth';

@Injectable()
export class TypeOrmRulesRepository implements RulesRepository {
  constructor(
    @InjectRepository(RuleORM)
    private readonly RuleRepository: Repository<RuleORM>,
  ) {}
  getAll(): Promise<Rule[]> {
    return this.RuleRepository.find();
  }
}
