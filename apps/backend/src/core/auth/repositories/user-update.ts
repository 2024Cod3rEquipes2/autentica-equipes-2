import { User } from '../entities';

export interface UserUpdate {
  updateUser(user: any): Promise<User | null>;
  getUserById(userId: number): Promise<User | null>;
}
