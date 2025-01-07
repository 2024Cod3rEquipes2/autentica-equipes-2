import { Module } from '@nestjs/common';
import { NodeMailEmailService } from './email.service';

@Module({
  providers: [NodeMailEmailService],
  exports: [NodeMailEmailService],
})
export class EmailModule {}
