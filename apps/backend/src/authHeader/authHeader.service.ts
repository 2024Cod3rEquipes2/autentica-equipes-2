import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthHeader {
  extractToken(request: Request): string {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      console.log('1');
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('2');
      throw new UnauthorizedException('Token is missing');
    }

    return token;
  }
}
