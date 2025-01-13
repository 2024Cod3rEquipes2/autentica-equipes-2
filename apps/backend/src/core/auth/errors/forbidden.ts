import { BaseError } from './base-error';

export class Forbidden extends BaseError {
  constructor() {
    super('USER_NOT_AUTHORIZED');
  }
}
