import { GroupRepository } from '../repositories';
import { UseCase } from './use-case';

export type AddGroupParams = {
  groupName: string;
  rules: string[];
};

export class AddGroup implements UseCase<AddGroupParams, void> {
  constructor(private groupRepository: GroupRepository) {}

  async handle({ groupName, rules }: AddGroupParams): Promise<void> {
    // Save the updated user
    console.log('Adding group:', groupName);
  }
}
