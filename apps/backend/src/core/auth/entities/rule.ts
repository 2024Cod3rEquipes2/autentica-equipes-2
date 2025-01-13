import { ValidationError } from '../errors';

export class Rule {
  id: number;
  name: string;
  constructor(props: { id: number; name: string }) {
    if (props.id === undefined || props.id === null) {
      throw new ValidationError('RULE_ID_IS_REQUIRED');
    }
    if (props.name === undefined || props.name === null) {
      throw new ValidationError('RULE_NAME_IS_REQUIRED');
    }

    this.id = props.id;
    this.name = props.name;
  }
}
