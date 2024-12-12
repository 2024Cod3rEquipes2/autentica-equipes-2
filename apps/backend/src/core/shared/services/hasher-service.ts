export interface HasherService<T extends object> {
  encode(value: T): Promise<string>;
  decode(value: string, secret: string): Promise<T>;
}
