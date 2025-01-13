import { Rule } from '../entities';
import { RulesRepository } from '../repositories';
import { UseCase } from './use-case';

export class GetAllRules implements UseCase<void, Rule[]> {
  constructor(private ruleRepository: RulesRepository) {}

  handle(): Promise<Rule[]> {
    return this.ruleRepository.getAll();
  }
}
