import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Group as GroupORM } from './entities/group.entity';
import { In, Repository } from 'typeorm';
import { Group, GroupRepository } from '../core/auth';

@Injectable()
export class TypeOrmGroupRepository implements GroupRepository {
  constructor(
    @InjectRepository(GroupORM)
    private readonly groupRepository: Repository<GroupORM>,
  ) {}

  async getManyByIds(ids: number[]): Promise<Group[]> {
    const groups = await this.groupRepository.find({
      relations: {
        rules: true,
      },
      where: { id: In(ids) },
    });

    return groups.map((group) => {
      return Group.CreateFromExistence(group.id, group.name, group.rules);
    });
  }
}
