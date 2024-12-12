import { Injectable } from '@nestjs/common';
import { HasherService } from 'src/core/shared/services';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HasherJWTService<T extends object> implements HasherService<T> {
  constructor(private readonly jwtService: JwtService) {}

  encode(value: T): Promise<string> {
    return this.jwtService.signAsync(value);
  }

  async decode(value: string, secret: string): Promise<T> {
    return await this.jwtService.verifyAsync(value, { secret });
  }
}
