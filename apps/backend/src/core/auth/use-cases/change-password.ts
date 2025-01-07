import e from 'express';
import { UseCase } from './use-case';
import { UserRepository } from '../repositories';
import { CryptographyService } from 'src/core/shared';
import { RequiredField, UserNotFound, ValidationError } from '../errors';

export type ChangePassowrdParams = {
  userId: number;
  password: string;
  confirmPassword: string;
  lastPassword: string;
};

export class ChangePassowrd implements UseCase<ChangePassowrdParams, void> {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly cryptographyService: CryptographyService,
  ) {}

  async handle(params: ChangePassowrdParams): Promise<void> {
    if (params.userId === undefined || params.userId === null) {
      throw new RequiredField('userId');
    }
    if (!params.password) {
      throw new RequiredField('password');
    }
    if (!params.confirmPassword) {
      throw new RequiredField('confirmPassword');
    }

    if (params.password !== params.confirmPassword) {
      throw new ValidationError('PASSWORDS_DOES_NOT_MATCH');
    }

    const user = await this.usersRepository.getById(params.userId);
    if (!user) {
      throw new UserNotFound();
    }
    const samePassord = await this.cryptographyService.compare(
      params.lastPassword,
      user.password,
    );
    if (!samePassord) {
      throw new ValidationError('LAST_PASSWORD_IS_NOT_VALID');
    }
    const newPasswordEncrypted = await this.cryptographyService.encrypt(
      params.password,
    );

    user.password = newPasswordEncrypted;

    this.usersRepository.update(user);
  }
}
