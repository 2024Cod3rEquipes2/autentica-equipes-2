import { Module } from '@nestjs/common';

import { HasherJWTService } from './hasher-jwt.service';

@Module({
  providers: [HasherJWTService],
  exports: [HasherJWTService],
})
export class HasherModule {}
