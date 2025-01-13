import { Group } from '../entities';
import { ValidationError } from '../errors';
import { GroupRepository, RulesRepository } from '../repositories';
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
    let newGroup = Group.CreateNew(name);

    const group = await this.groupRepository.findByName(name);
    if (group) {
      throw new ValidationError('GROUP_ALREADY_EXISTS');
    }

    const storedRules = await this.ruleRepository.getAll();
    rules?.forEach((rule) => {
      const storedRule = storedRules.find((r) => r.name === rule);
      if (!storedRule) {
        throw new ValidationError('RULE_NOT_FOUND');
      }
      newGroup = newGroup.AddRule(storedRule.id, rule);
    });

    await this.groupRepository.create(newGroup);
  }
}
