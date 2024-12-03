import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TypeOrmService } from './typeorm.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TypeOrmService],
  exports: [TypeOrmService],
})
export class DbModule {}
