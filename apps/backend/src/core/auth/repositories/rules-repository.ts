import { Rule } from '../entities';

export interface RulesRepository {
  getAll(): Promise<Rule[]>;
}
