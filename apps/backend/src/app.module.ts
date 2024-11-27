import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      entities: [User],
      synchronize: true, // atualiza o banco de dados automaticamente
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
