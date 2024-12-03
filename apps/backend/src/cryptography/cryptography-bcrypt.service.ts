import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CryptographyService } from 'src/core/shared/services';

@Injectable()
export class CryptographyBcryptService implements CryptographyService {
  private static SALT = 10;
  encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, CryptographyBcryptService.SALT);
  }
  compare(value: string, encryptedValue: string): Promise<boolean> {
    return bcrypt.compare(value, encryptedValue);
  }
}
