import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User as UserORM } from './entities/user.entity';
import { Repository } from 'typeorm';
import { User, UserRepository } from '../core/auth';
import { Group } from './entities/group.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserORM)
    private readonly usersRepository: Repository<UserORM>,
  ) {}
  static fromORM(user: UserORM): User | null {
    if (!user) return null;
    console.log(user);
    return User.createFromExisting({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      recoverToken: user.recoverToken,
      phoneNumber: user.phoneNumber,
      groups: user.groups.map((group) => group.id),
    });
  }

  static fromDomain(user: User): UserORM {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      recoverToken: user.recoverToken,
      phoneNumber: user.phoneNumber,
      groups: user.groups.map((group) => {
        const groupOrm = new Group();
        groupOrm.id = group;
        return groupOrm;
      }),
    };
  }

  async getByRecoverToken(recoverToken: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { recoverToken: recoverToken },
      relations: ['groups'],
    });
    return TypeOrmUserRepository.fromORM(user);
  }
  async getAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: ['groups'],
    });
    return users.map((user) => TypeOrmUserRepository.fromORM(user));
  }
  async getById(userId: number): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['groups'],
    });
    return TypeOrmUserRepository.fromORM(user);
  }
  async getByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['groups'],
    });
    return TypeOrmUserRepository.fromORM(user);
  }
  async create(userParameter: User): Promise<User> {
    return this.save(userParameter);
  }
  async update(userParameter: User): Promise<User> {
    return this.save(userParameter);
  }

  private async save(userParameter: User): Promise<User> {
    const user = await this.usersRepository.save(
      TypeOrmUserRepository.fromDomain(userParameter),
    );
    return TypeOrmUserRepository.fromORM(user);
  }

  deleteAll(): Promise<void> {
    return this.usersRepository.clear();
  }
}
