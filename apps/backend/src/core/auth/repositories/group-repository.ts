import { Group } from '../entities';

export interface GroupRepository {
  getManyByIds(ids: number[]): Promise<Group[]>;
  findByName(name: string): Promise<Group | null>;
  create(group: Group): Promise<Group>;
}
