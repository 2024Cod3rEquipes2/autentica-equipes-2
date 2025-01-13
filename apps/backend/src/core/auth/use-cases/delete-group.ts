import { Group } from '../entities';
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
    if (Group.isSystemGroup(id)) {
      throw new ValidationError('SYSTEM_GROUP_CANNOT_BE_DELETED');
    }

    await this.groupRepository.delete(id);
  }
}
