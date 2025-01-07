import { CryptographyService } from 'src/core/shared/services/cryptography-service';
import { RequiredField } from '../errors/required-field';
import { UserRepository } from '../repositories/user-repository';
import { UseCase } from './use-case';
import { CredentialsInvalid } from '../errors';
import { HasherService } from 'src/core/shared/services/hasher-service';

export type LoginParams = {
  email: string;
  password: string;
};
export type LoginResult = {
  token: string;
};

export type TokenInfo = {
  email: string;
  userId: number;
  name: string;
};

export class Login implements UseCase<LoginParams, LoginResult> {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly cryptografyService: CryptographyService,
    private readonly hasherService: HasherService<TokenInfo>,
  ) {}

  async handle(params: LoginParams): Promise<LoginResult> {
    const { email, password } = params;
    if (!email) {
      throw new RequiredField('email');
    }
    if (!password) {
      throw new RequiredField('password');
    }

    const user = await this.usersRepository.getByEmail(email);
    if (!user) {
      throw new CredentialsInvalid();
    }
    const samePassword = await this.cryptografyService.compare(
      password,
      user.password,
    );
    if (!samePassword) {
      throw new CredentialsInvalid();
    }
    const token = await this.hasherService.encode({
      email: user.email,
      name: user.name,
      userId: user.id,
    });

    return {
      token,
    };
  }
}
