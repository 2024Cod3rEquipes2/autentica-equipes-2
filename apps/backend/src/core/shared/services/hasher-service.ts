export interface HasherService<T extends object> {
  encode(value: T): Promise<string>;
  decode(value: string): Promise<T>;
}
