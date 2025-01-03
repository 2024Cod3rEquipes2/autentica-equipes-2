import { UseCase } from "src/core/auth/use-cases/use-case";
import { CryptographyService } from "src/core/shared";
import { TypeOrmService } from "src/db/typeorm.service";
import { CredentialsInvalid, RequiredField } from "src/core/auth/errors";


export type UpdateParams = {
  email: string;
};

export type UpdateResult = {
  userId: number;
};

export type UserToken = {
  userId: number;
  token: string;
  secretKey: string;
};

export class  RecoverPassword implements UseCase<UpdateParams, UpdateResult> {
  constructor(
    private readonly typeOrmService: TypeOrmService,
    private readonly cryptografyService: CryptographyService,
  ) {}

  async handle(params: UpdateParams): Promise<UpdateResult> {
    const { email } = params;
    console.log(email)

  if(!email) {
    throw new RequiredField(email);
  }
  
  const user = await this.typeOrmService.getUserByEmail(email);
  if (!user) {
    throw new CredentialsInvalid();
  }

  const recoverToken = await this.cryptografyService.encrypt(
    JSON.stringify({ userId: user.id }),
  );

  user.recoverToken = recoverToken;

  await this.typeOrmService.updateUser(user);
  console.log(recoverToken);

  return { userId: user.id };
  }
}
