import { User } from '../entities/user';

export interface UserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  getAll(): Promise<User[]>;
}
