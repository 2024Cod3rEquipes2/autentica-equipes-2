import { ValidationError } from '../errors';
import { GroupRepository } from '../repositories';
import { UseCase } from './use-case';

export type DeleteGroupParams = {
  id: number;
};

export class DeleteGroup implements UseCase<DeleteGroupParams, void> {
  constructor(private groupRepository: GroupRepository) {}

  async handle({ id }: DeleteGroupParams): Promise<void> {
    // Check if group already exists
    if (id === 1) {
      throw new ValidationError('ADMIN_GROUP_IS_NOT_DELETABLE');
    }
    if (id === 2) {
      throw new ValidationError('GUEST_GROUP_IS_NOT_DELETABLE');
    }

    await this.groupRepository.delete(id);
  }
}
