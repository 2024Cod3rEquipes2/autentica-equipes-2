import { Group } from './group';

export class GroupList {
  constructor(private readonly groups: Group[]) {}

  hasRule(rule: string): boolean {
    return this.groups.some((group) => group.hasRule(rule));
  }

  hasSomeRule(rules: string[]): boolean {
    return rules.some((rule) => this.hasRule(rule));
  }
}
