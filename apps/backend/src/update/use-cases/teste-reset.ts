import { UseCase } from '../../core/auth/use-cases/use-case';
import { CredentialsInvalid, RequiredField } from '../../core/auth/errors';
import { TypeOrmService } from 'src/db/typeorm.service';
import { CryptographyService } from 'src/core/shared';
import { AuthHeader } from 'src/authHeader/authHeader.service';
import { Request } from 'express';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { error } from 'console';
import { console } from 'inspector';

export type UpdateParams = {
  request: Request;
  password: string;
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

export class ResetPassword implements UseCase<UpdateParams, UpdateResult> {
  constructor(
    private readonly typeOrmService: TypeOrmService,
    private readonly cryptografyService: CryptographyService,
    private readonly hasherJWTService: HasherJWTService<UserToken>,
    private readonly authHeader: AuthHeader,

    
  ) {}

  async handle(params: UpdateParams): Promise<UpdateResult> {
    const { request, password, confirmPassword} = params;
    console.log(request, password, confirmPassword)

    if (!password) {
      console.log('1', error)
      throw new RequiredField(password);
    }
    if (!confirmPassword) {
      console.log('2', error)
      throw new RequiredField(confirmPassword);
    }

    if (password !== confirmPassword) {
      console.log('3', error)
      throw new CredentialsInvalid();
    }
    const tokenParams = this.authHeader.extractToken(request);

    console.log(tokenParams);

    let decodedToken: UserToken;
    try {
      decodedToken = await this.hasherJWTService.decode(tokenParams);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('4', error)
      throw new CredentialsInvalid();
    }  
    if (!decodedToken || !decodedToken.userId) {
      console.log('5', error)
      throw new CredentialsInvalid();
    }

    const { userId } = decodedToken;


    const existingUser =
      await this.typeOrmService.getUserById(userId);
    if (!existingUser) {
      console.log('6', error)
      throw new CredentialsInvalid();
    }

    const newPasswordEncrypted =
      await this.cryptografyService.encrypt(password);

    const samePassword = await this.cryptografyService.compare(
      password,
      existingUser.password,
    );
    if (samePassword) {
      console.log('7', error)
      throw new CredentialsInvalid();
    }

    existingUser.password = newPasswordEncrypted;
    existingUser.recoverToken = null;
    await this.typeOrmService.updateUser(existingUser);

  

    return {
      userId,
    };
  }
}
