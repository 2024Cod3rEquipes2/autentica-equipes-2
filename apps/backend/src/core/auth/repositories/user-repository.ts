import { User } from '../entities/user';

export interface UserRepository {
  getById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  getAll(): Promise<User[]>;
  getByRecoverToken(recoverToken: string): Promise<User | null>;
  update(user: User): Promise<User>;
}
