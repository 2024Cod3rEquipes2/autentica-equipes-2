import { ValidationError } from '../errors';
import { UserRepository } from '../repositories';
import { UseCase } from './use-case';

export type EditUserParams = {
  id: number;
  groups: number[];
};

export class EditUser implements UseCase<EditUserParams, void> {
  constructor(private userRepository: UserRepository) {}

  async handle({ id, groups }: EditUserParams): Promise<void> {
    if (id === 1) {
      throw new ValidationError('ADMIN_USER_NOT_EDITABLE');
    }
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new ValidationError('User_NOT_FOUND');
    }

    user.addGroups(groups.map((groupId) => ({ id: groupId, name: null })));

    await this.userRepository.update(user);
  }
}
