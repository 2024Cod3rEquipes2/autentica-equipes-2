import { BaseError } from './base-error';

export class ValidationError extends BaseError {
  constructor(code: string) {
    super(code);
  }
}
