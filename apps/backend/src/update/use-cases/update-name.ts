import { RequiredField } from '../../core/auth/errors/required-field';
import { UseCase } from '../../core/auth/use-cases/use-case';
import { CredentialsInvalid } from '../../core/auth/errors';
import { Request } from 'express';
import { TypeOrmService } from 'src/db/typeorm.service';
import { jwtConstants } from 'src/hasher/constants';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { AuthHeader } from 'src/authHeader/authHeader.service';

export type UpdateParams = {
  request: Request;
  newName: string;
};

export type UpdateResult = {
  userId: number;
  newName: string;
};

export type UserToken = {
  userId: number;
  token: string;
  secretKey: string;
};

export class UpdateName implements UseCase<UpdateParams, UpdateResult> {
  constructor(
    private readonly typeOrmService: TypeOrmService,
    private readonly hasherJWTService: HasherJWTService<UserToken>,
    private readonly authHeader: AuthHeader,
  ) {}

  async handle(params: UpdateParams): Promise<UpdateResult> {
    const { request, newName } = params;

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

    if (!newName || newName.trim() === '') {
      console.log('5');
      throw new RequiredField('newName');
    }

    const existingUser = await this.typeOrmService.getById(userId);
    if (!existingUser) {
      console.log('6');
      throw new CredentialsInvalid();
    }

    existingUser.name = newName;
    await this.typeOrmService.update(existingUser);

    return {
      userId,
      newName,
    };
  }
}
