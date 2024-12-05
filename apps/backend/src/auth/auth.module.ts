import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { CryptographyModule } from 'src/cryptography/cryptography.module';
import { HasherModule } from 'src/hasher/hasher.module';

@Module({
  imports: [DbModule, CryptographyModule, HasherModule],
  controllers: [AuthController],
})
export class AuthModule {}
