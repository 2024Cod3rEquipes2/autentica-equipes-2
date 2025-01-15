import { User } from '../entities';
import { UserRepository } from '../repositories';
import { UseCase } from './use-case';

export class GetAllUsers implements UseCase<void, User[]> {
  constructor(private userRepository: UserRepository) {}

  handle(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
