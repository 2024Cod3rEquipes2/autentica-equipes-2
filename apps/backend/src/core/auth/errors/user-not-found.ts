import { BaseError } from './error-base';

export class UserNotFound extends BaseError {
  constructor() {
    super('USER_NOT_FOUnD');
  }
}
