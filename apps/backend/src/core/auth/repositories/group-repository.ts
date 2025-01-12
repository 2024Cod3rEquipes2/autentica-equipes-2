import { Group } from '../entities';

export interface GroupRepository {
  getManyByIds(ids: number[]): Promise<Group[]>;
}
