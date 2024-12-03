export type BaseErrorParams = {
  code: string;
};

export abstract class BaseError extends Error {
  code: string;
  constructor(code: string) {
    super(code);
    this.code = code;
  }
}
