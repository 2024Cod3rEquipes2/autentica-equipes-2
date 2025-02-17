import { Module } from '@nestjs/common';
import { UpdateController } from './update.controller';
import { UpdateName } from 'src/update/use-cases/update-name';
import { AuthHeader } from 'src/authHeader/authHeader.service';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { User } from 'src/db/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserRepository } from 'src/db/typeorm-user-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UpdateController],
  providers: [
    UpdateName,
    AuthHeader,
    HasherJWTService,
    User,
    TypeOrmUserRepository,
  ],
})
export class UpdateModule {}
