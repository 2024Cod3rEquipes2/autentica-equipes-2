import { GroupList } from '../entities';
import { Forbidden } from '../errors';
import { GroupRepository, UserRepository } from '../repositories';
import { UseCase } from '../use-cases/use-case';

type AthorizedUseCaseParams<T> = {
  userId: number;
  data: T;
};

export class AthorizedUseCase<T, R>
  implements UseCase<AthorizedUseCaseParams<T>, R>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository,
    private readonly nextUseCase: UseCase<T, R>,
    private readonly rules: string[],
  ) {}

  async handle(params: AthorizedUseCaseParams<T>): Promise<R> {
    const user = await this.userRepository.getById(params.userId);
    if (!user) {
      throw new Forbidden();
    }

    const groups = await this.groupRepository.getManyByIds(user.groups);
    const groupslist = new GroupList(groups);
    console.log(groupslist);
    if (
      this.rules &&
      this.rules.length > 0 &&
      groupslist.hasSomeRule(this.rules)
    ) {
      return await this.nextUseCase.handle(params.data);
    }
    throw new Forbidden();
  }
}
