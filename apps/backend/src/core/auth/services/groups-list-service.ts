import { Group } from '../entities/group';

export class GroupListService {
  constructor(private readonly groups: Group[]) {}

  hasRule(rule: string): boolean {
    return this.groups.some((group) => group.hasRule(rule));
  }

  hasSomeRule(rules: string[]): boolean {
    return rules.some((rule) => this.hasRule(rule));
  }

  getDistinctRules(): string[] {
    const rules = new Set<string>();
    this.groups.forEach((group) =>
      group.rules.forEach((rule) => rules.add(rule.name)),
    );
    return Array.from(rules);
  }
}
