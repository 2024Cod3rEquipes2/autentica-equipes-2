import { CryptographyService } from 'src/core/shared';
import { UserRepository } from '../repositories';
import { UseCase } from './use-case';
import { RequiredField, ValidationError } from '../errors';

export type ResetPassowrdParams = {
  recoverToken: string;
  password: string;
  confirmPassword: string;
};

export class ResetPassowrd implements UseCase<ResetPassowrdParams, void> {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly cryptographyService: CryptographyService,
  ) {}

  async handle(params: ResetPassowrdParams): Promise<void> {
    if (!params.password) {
      throw new RequiredField('password');
    }
    if (!params.confirmPassword) {
      throw new RequiredField('confirmPassword');
    }

    if (params.password !== params.confirmPassword) {
      throw new ValidationError('PASSWORDS_NOT_MATCH');
    }

    const user = await this.usersRepository.getByRecoverToken(
      params.recoverToken,
    );

    if (!user) {
      throw new ValidationError('TOKEN_NOT_VALID');
    }
    const newPasswordEncrypted = await this.cryptographyService.encrypt(
      params.password,
    );

    user.password = newPasswordEncrypted;
    user.recoverToken = null;

    this.usersRepository.update(user);
  }
}
