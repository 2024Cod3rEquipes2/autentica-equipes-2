export interface IToken {
  email: string;
  name: string;
  userId: number;
  groups: ITokenGroup[];
  rules: string[];
}

interface ITokenGroup {
  id: number;
  name: string;
}

export interface IRule {
  id: number;
  name: string;
}

export interface IGroup {
  id: number;
  name: string;
  rules: IRule[];
  isSystem: boolean;
}
