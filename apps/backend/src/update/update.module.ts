import { Module } from '@nestjs/common';
import { UpdateController } from './update.controller';
import { UpdateName } from 'src/update/use-cases/update-name';
import { AuthHeader } from 'src/authHeader/authHeader.service';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { User } from 'src/db/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from 'src/db/typeorm.service';
import { CryptographyModule } from 'src/cryptography/cryptography.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
           CryptographyModule,
           DbModule],
  controllers: [UpdateController],
  providers: [UpdateName, AuthHeader, HasherJWTService, User, TypeOrmService, CryptographyModule],
})
export class UpdateModule {}
