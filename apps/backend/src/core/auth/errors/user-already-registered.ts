import { BaseError } from "./error-base";

export class UserAlreadyRegistered extends BaseError {
  constructor() {
    super("USER_ALREADY_REGISTERED");
  }
}
