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

export class Group {
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

  AddRule(id: number, name: string): Group {
    return new Group({
      id: this.id,
      name: this.name,
      rules: [...this.rules, new Rule({ id, name })],
    });
  }
}
