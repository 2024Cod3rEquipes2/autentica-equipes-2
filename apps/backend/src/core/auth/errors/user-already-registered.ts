import { BaseError } from './base-error';

export class UserAlreadyRegistered extends BaseError {
  constructor() {
    super('USER_ALREADY_REGISTERED');
  }
}
