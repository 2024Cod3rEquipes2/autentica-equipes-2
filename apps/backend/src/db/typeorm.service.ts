import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User as UserORM } from './entities/user.entity';
import { Repository } from 'typeorm';
import { User, UserRepository } from '../core/auth';

@Injectable()
export class TypeOrmService implements UserRepository {
  constructor(
    @InjectRepository(UserORM)
    private readonly usersRepository: Repository<UserORM>,
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }
  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }
}
