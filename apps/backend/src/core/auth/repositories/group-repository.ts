import { Group } from '../entities';

export interface GroupRepository {
  getManyByIds(ids: number[]): Promise<Group[]>;
  getByName(name: string): Promise<Group | null>;
  getById(id: number): Promise<Group | null>;
  create(group: Group): Promise<Group>;
  update(group: Group): Promise<Group>;
  getAll(): Promise<Group[]>;
  delete(id: number): Promise<void>;
}
