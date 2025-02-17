import { CryptographyService } from 'src/core/shared/services/cryptography-service';
import { User } from '../entities/user';
import { RequiredField } from '../errors/required-field';
import { UserAlreadyRegistered } from '../errors/user-already-registered';
import { UserRepository } from '../repositories/user-repository';
import { UseCase } from './use-case';
import { ValidationError } from '../errors';

export type RegisterUserParams = {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
  phoneNumber?: string;
};

export class RegisterUser implements UseCase<RegisterUserParams, User> {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly cryptografyService: CryptographyService,
  ) {}

  async handle(params: RegisterUserParams): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, password, name, phoneNumber } = params;
    if (params.password !== params.confirmPassword) {
      throw new ValidationError('PASSWORDS_DO_NOT_MATCH');
    }
    const passwordEncrypted = await this.cryptografyService.encrypt(password);
    const newUser = User.createGuestUser({
      email,
      password: passwordEncrypted,
      name,
      phoneNumber,
    });

    const existingUser = await this.usersRepository.getByEmail(email);
    if (existingUser) {
      throw new UserAlreadyRegistered();
    }

    const user = await this.usersRepository.create(newUser);
    return user;
  }
}
