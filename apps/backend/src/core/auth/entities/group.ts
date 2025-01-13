import { ValidationError } from '../errors';
import { Rule } from './rule';

type baseProps = {
  name: string;
  rules: { id: number; name: string | null }[];
};
type GroupProps = baseProps & {
  id: number | null;
};

type CreateFromExistenseGroupProps = baseProps & {
  id: number;
};

type RulesParams = {
  id: number;
  name: string;
};

export class Group {
  static readonly SYSTEM_GROUP_ID = [1, 2];
  readonly id: number | null;
  readonly name: string;
  readonly rules: Rule[];

  private constructor(props: GroupProps) {
    if (!props.name) {
      throw new ValidationError('GROUP_NAME_IS_REQUIRED');
    }

    this.id = props.id;
    this.name = props.name;
    this.rules = props.rules;
  }

  static createFromExisting(props: CreateFromExistenseGroupProps): Group {
    if (props.id === undefined || props.id === null) {
      throw new ValidationError('GROUP_ID_IS_REQUIRED');
    }
    return new Group(props);
  }
  static CreateNew(name: string): Group {
    return new Group({ id: null, name, rules: [] });
  }

  hasRule(rule: string): boolean {
    return this.rules.some((r) => r.name === rule);
  }

  addRule(rule: RulesParams) {
    if (!this.hasRule(rule.name)) {
      this.rules.push(new Rule(rule));
    }
  }
  addRules(rules: RulesParams[]): void {
    rules.forEach((rule) => {
      this.addRule(rule);
    });
  }

  static isSystemGroup(id: number): boolean {
    return Group.SYSTEM_GROUP_ID.includes(id);
  }

  isSystem(): boolean {
    return Group.isSystemGroup(this.id);
  }
}
