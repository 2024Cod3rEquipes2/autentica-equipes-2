import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './hasher/constants';
import { UpdateModule } from './update/update.module';
import { HasherJWTService } from './hasher/hasher-jwt.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      entities: [User],
      migrations: ['../db'],
      synchronize: true, // atualiza o banco de dados automaticamente
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    DbModule,
    UpdateModule,
  ],
  providers: [HasherJWTService],
  exports: [HasherJWTService],
  controllers: [],
})
export class AppModule {}
