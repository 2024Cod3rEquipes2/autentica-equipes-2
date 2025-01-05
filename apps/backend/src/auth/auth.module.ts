import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { CryptographyModule } from 'src/cryptography/cryptography.module';
import { HasherModule } from 'src/hasher/hasher.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [DbModule, CryptographyModule, HasherModule, EmailModule],
  controllers: [AuthController],
})
export class AuthModule {}
