import { Module } from '@nestjs/common';
import { CryptographyBcryptService } from './cryptography-bcrypt.service';

@Module({
  providers: [CryptographyBcryptService],
  exports: [CryptographyBcryptService],
})
export class CryptographyModule {}
