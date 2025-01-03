import { AuthHeader } from "src/authHeader/authHeader.service";
import { UseCase } from "src/core/auth/use-cases/use-case";
import { CryptographyService } from "src/core/shared";
import { TypeOrmService } from "src/db/typeorm.service";
import { HasherJWTService } from "src/hasher/hasher-jwt.service";
import { Request } from 'express';
import { CredentialsInvalid, RequiredField } from "src/core/auth/errors";


export type UpdateParams = {
  request: Request;
  newPassword: string;
  confirmPassword: string;
};

export type UpdateResult = {
  userId: number;
};

export type UserToken = {
  userId: number;
  token: string;
  secretKey: string;
};

export class ChangePassword implements UseCase<UpdateParams, UpdateResult> {
  constructor(
    private readonly typeOrmService: TypeOrmService,
    private readonly hasherJWTService: HasherJWTService<UserToken>,
    private readonly authHeader: AuthHeader,
    private readonly cryptografyService: CryptographyService,
  ) {}

  async handle(params: UpdateParams): Promise<UpdateResult> {
    const { request, newPassword, confirmPassword } = params;
    console.log(newPassword, confirmPassword)


    const tokenParams = this.authHeader.extractToken(request);
    console.log(typeof tokenParams);

    let decodedToken: UserToken;
    try {
      decodedToken = await this.hasherJWTService.decode(tokenParams);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('3', error);
      throw new CredentialsInvalid();
    }

    if (!decodedToken || !decodedToken.userId) {
      console.log('4');
      throw new CredentialsInvalid();
    }

    const { userId } = decodedToken;
    console.log(userId)

    if (!newPassword) {
      console.log('5', Error);
      throw new RequiredField('newPassword');
    }

    if (!confirmPassword) {
      console.log('6');
      throw new RequiredField('confirmPassword');
    }

    if (newPassword !== confirmPassword) {
      console.log('7');
      throw new CredentialsInvalid();
    }

    const user = await this.typeOrmService.getUserById(userId);
    if (!user) {
      console.log('8');
      throw new CredentialsInvalid();
    }

    const samePassword = await this.cryptografyService.compare(
      newPassword,
      user.password,
    );

    if (samePassword) {
      console.log('9');
      throw new CredentialsInvalid();
    }
    const newPasswordEncrypted = await this.cryptografyService.encrypt(newPassword);

    user.password = newPasswordEncrypted;

    await this.typeOrmService.updateUser(user);

    return {
      userId
    };
  }
}
