import { Module } from '@nestjs/common';
import { AuthHeader } from './authHeader.service';

@Module({
  providers: [AuthHeader],
  exports: [AuthHeader],
})
export class AuthHeaderModule {}
