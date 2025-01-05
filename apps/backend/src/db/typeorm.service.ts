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
  getByRecoverToken(recoverToken: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { recoverToken: recoverToken },
    });
  }
  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  getUserById(userId: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }
  getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }
  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
  updateUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
  deleteAll(): Promise<void> {
    return this.usersRepository.clear();
  }
}
