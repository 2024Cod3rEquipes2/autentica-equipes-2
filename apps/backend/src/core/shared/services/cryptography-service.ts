export interface CryptographyService {
  encrypt(value: string): Promise<string>;
  compare(value: string, encryptedValue: string): Promise<boolean>;
}
