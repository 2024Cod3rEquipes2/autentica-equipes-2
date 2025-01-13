import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Group as GroupORM } from './entities/group.entity';
import { Rule as RuleORM } from './entities/rule.entity';
import { In, Repository } from 'typeorm';
import { Group, GroupRepository } from '../core/auth';

@Injectable()
export class TypeOrmGroupRepository implements GroupRepository {
  constructor(
    @InjectRepository(GroupORM)
    private readonly groupRepository: Repository<GroupORM>,
  ) {}

  static fromORM(group: GroupORM): Group | null {
    console.log(group);
    if (!group) return null;
    return Group.createFromExisting({
      id: group.id,
      name: group.name,
      rules: group.rules.map((rule) => ({ id: rule.id, name: rule.name })),
    });
  }

  static fromDomain(user: Group): GroupORM {
    return {
      id: user.id,
      name: user.name,
      rules: user.rules.map((rule) => {
        const ruleOrm = new RuleORM();
        ruleOrm.id = rule.id;
        return ruleOrm;
      }),
    };
  }
  private async save(userParameter: Group): Promise<Group> {
    const group = await this.groupRepository.save(
      TypeOrmGroupRepository.fromDomain(userParameter),
    );
    return TypeOrmGroupRepository.fromORM(group);
  }

  create(groupParameter: Group): Promise<Group> {
    return this.save(groupParameter);
  }
  update(groupParameter: Group): Promise<Group> {
    return this.save(groupParameter);
  }

  async getByName(name: string): Promise<Group | null> {
    const group = await this.groupRepository.findOne({
      relations: {
        rules: true,
      },
      where: { name },
    });
    return TypeOrmGroupRepository.fromORM(group);
  }

  async getById(id: number): Promise<Group | null> {
    const group = await this.groupRepository.findOne({
      relations: {
        rules: true,
      },
      where: { id },
    });
    return TypeOrmGroupRepository.fromORM(group);
  }

  async getManyByIds(ids: number[]): Promise<Group[]> {
    const groups = await this.groupRepository.find({
      relations: {
        rules: true,
      },
      where: { id: In(ids) },
    });

    return groups.map(TypeOrmGroupRepository.fromORM);
  }

  async getAll(): Promise<Group[]> {
    const groups = await this.groupRepository.find({
      relations: {
        rules: true,
      },
    });

    return groups.map(TypeOrmGroupRepository.fromORM);
  }
}
