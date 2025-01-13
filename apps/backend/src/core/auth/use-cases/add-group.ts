import { Group } from '../entities';
import { ValidationError } from '../errors';
import { GroupRepository, RulesRepository } from '../repositories';
import { RulesListService } from '../services';
import { UseCase } from './use-case';

export type AddGroupParams = {
  name: string;
  rules: string[];
};

export class AddGroup implements UseCase<AddGroupParams, void> {
  constructor(
    private groupRepository: GroupRepository,
    private ruleRepository: RulesRepository,
  ) {}

  async handle({ name, rules }: AddGroupParams): Promise<void> {
    // Check if group already exists
    const newGroup = Group.CreateNew(name);

    const group = await this.groupRepository.getByName(name);
    if (group) {
      throw new ValidationError('GROUP_ALREADY_EXISTS');
    }

    const storedRules = await this.ruleRepository.getAll();
    const rulesListService = new RulesListService(storedRules);
    newGroup.addRules(rulesListService.getAllMatchedRules(rules));

    await this.groupRepository.create(newGroup);
  }
}
