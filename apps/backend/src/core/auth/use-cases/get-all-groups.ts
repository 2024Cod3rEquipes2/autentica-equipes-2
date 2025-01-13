import { Group } from '../entities';
import { GroupRepository } from '../repositories';
import { UseCase } from './use-case';

export class GetAllGroups implements UseCase<void, Group[]> {
  constructor(private groupRepository: GroupRepository) {}

  handle(): Promise<Group[]> {
    return this.groupRepository.getAll();
  }
}
