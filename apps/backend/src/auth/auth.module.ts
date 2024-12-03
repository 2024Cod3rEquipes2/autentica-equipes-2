import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { DbModule } from 'src/db/db.module';
import { CryptographyModule } from 'src/cryptography/cryptography.module';
import { HasherModule } from 'src/hasher/hasher.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    DbModule,
    CryptographyModule,
    HasherModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
