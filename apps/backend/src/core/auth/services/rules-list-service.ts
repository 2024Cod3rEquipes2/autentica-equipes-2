import { Rule } from '../entities';
import { ValidationError } from '../errors';

export class RulesListService {
  constructor(private readonly rules: Rule[]) {}

  hasAllRules(rules: string[]): boolean {
    return rules.every((rule) => this.rules.some((r) => r.name === rule));
  }
  getAllMatchedRules(rules: string[]): Rule[] {
    const result = [];
    rules?.forEach((rule) => {
      const storedRule = this.rules.find((r) => r.name === rule);
      if (!storedRule) {
        throw new ValidationError('RULE_NOT_FOUND');
      }
      result.push(storedRule);
    });
    return result;
  }
}
