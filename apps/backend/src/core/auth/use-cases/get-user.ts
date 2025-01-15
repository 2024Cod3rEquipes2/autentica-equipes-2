import { User } from '../entities';
import { ValidationError } from '../errors';
import { UserRepository } from '../repositories';
import { UseCase } from './use-case';

export type GetUserParams = {
  id: number;
};

export class GetUser implements UseCase<GetUserParams, User> {
  constructor(private userRepository: UserRepository) {}

  async handle(params: GetUserParams): Promise<User> {
    const user = await this.userRepository.getById(params.id);
    if (!user) {
      throw new ValidationError('USER_NOT_FOUND');
    }
    return user;
  }
}
