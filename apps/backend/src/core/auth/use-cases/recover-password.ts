import { CryptographyService } from 'src/core/shared';
import { UserRepository } from '../repositories';
import { UseCase } from './use-case';
import { RequiredField, ValidationError } from '../errors';
import { EmailService } from 'src/core/notificaiton';

export type RecoverPassowrdParams = {
  email: string;
};

export class RecoverPassowrd implements UseCase<RecoverPassowrdParams, void> {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly cryptographyService: CryptographyService,
    private readonly emailService: EmailService,
  ) {}

  async handle(params: RecoverPassowrdParams): Promise<void> {
    if (!params.email) {
      throw new RequiredField('email');
    }
    const user = await this.usersRepository.getByEmail(params.email);
    if (!user) {
      throw new ValidationError('USER_NOT_FOUND');
    }
    const recoverToken = await this.cryptographyService.encrypt(
      JSON.stringify({ userId: user.id, email: user.email }),
    );
    user.recoverToken = recoverToken;
    this.usersRepository.update(user);
    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Recover Password',
      text: 'http://localhost:3000/reset-password?token=' + recoverToken,
    });

    console.log(recoverToken);
  }
}
