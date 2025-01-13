import { ValidationError } from '../errors';
import { GroupRepository, RulesRepository } from '../repositories';
import { RulesListService } from '../services';
import { UseCase } from './use-case';

export type EditGroupParams = {
  id: number;
  rules: string[];
};

export class EditGroup implements UseCase<EditGroupParams, void> {
  constructor(
    private groupRepository: GroupRepository,
    private ruleRepository: RulesRepository,
  ) {}

  async handle({ id, rules }: EditGroupParams): Promise<void> {
    // Check if group already exists
    if (id === 1) {
      throw new ValidationError('ADMIN_GROUP_NOT_EDITABLE');
    }
    const group = await this.groupRepository.getById(id);
    if (!group) {
      throw new ValidationError('GROUP_NOT_FOUND');
    }

    const storedRules = await this.ruleRepository.getAll();
    const rulesListService = new RulesListService(storedRules);
    group.addRules(rulesListService.getAllMatchedRules(rules));

    await this.groupRepository.update(group);
  }
}
