import { CryptographyService } from 'src/core/shared/services/cryptography-service';
import { User } from '../entities/user';
import { RequiredField } from '../errors/required-field';
import { UserAlreadyRegistered } from '../errors/user-already-registered';
import { UserRepository } from '../repositories/user-repository';
import { UseCase } from './use-case';

export type RegisterUserParams = {
  email: string;
  password: string;
  name?: string;
};

export class RegisterUser implements UseCase<RegisterUserParams, User> {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly cryptografyService: CryptographyService,
  ) {}

  async handle(params: RegisterUserParams): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, password } = params;
    if (!email) {
      throw new RequiredField('email');
    }
    if (!password) {
      throw new RequiredField('password');
    }

    const existingUser = await this.usersRepository.getUserByEmail(email);
    if (existingUser) {
      throw new UserAlreadyRegistered();
    }
    const passwordEncrypted = await this.cryptografyService.encrypt(password);
    const user = await this.usersRepository.create({
      email,
      password: passwordEncrypted,
    });
    return user;
  }
}
