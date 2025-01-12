import { ValidationError } from '../errors';
import { Rule } from './rule';

export class Group {
  private constructor(
    public readonly id: number | null,
    public readonly name: string,
    public readonly rules: Rule[],
  ) {}

  static CreateFromExistence(id: number, name: string, rules: Rule[]): Group {
    if (id === undefined || id === null) {
      throw new ValidationError('GROUP_ID_IS_REQUIRED');
    }
    return new Group(id, name, rules);
  }

  hasRule(rule: string): boolean {
    return this.rules.some((r) => r.name === rule);
  }
}
