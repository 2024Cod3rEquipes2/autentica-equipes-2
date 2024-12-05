import { BaseError } from './base-error';

export class RequiredField extends BaseError {
  field: string;
  constructor(field: string) {
    super('REQUIRED_FIELD');
    if (!field || !field.trim()) {
      throw new Error('BASE_ERROR_REQUIRED_FIELD');
    }
    this.field = field;
  }
}
