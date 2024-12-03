import { BaseError } from './base-error';

export class CredentialsInvalid extends BaseError {
  constructor() {
    super('CREDENTIALS_INVALID');
  }
}
