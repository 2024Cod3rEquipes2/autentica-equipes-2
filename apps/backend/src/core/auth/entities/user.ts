import { RequiredField } from '../errors';

type UserProps = {
  id?: number;
  email: string;
  password: string;
  name: string;
  recoverToken?: string;
  phoneNumber?: string;
  groups: number[];
};

export type UserCreateGuestProps = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
};

export class User {
  id: number | null;
  email: string;
  password: string;
  name: string;
  recoverToken: string | null;
  phoneNumber: string;
  groups: number[];

  private constructor(props: UserProps) {
    if (!props.email) {
      throw new RequiredField('email');
    }
    if (!props.password) {
      throw new RequiredField('password');
    }
    if (!props.name) {
      throw new RequiredField('name');
    }

    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.name = props.name;
    this.recoverToken = props.recoverToken;
    this.phoneNumber = props.phoneNumber;
    this.groups = props.groups;
  }

  static createGuestUser(props: UserCreateGuestProps): User {
    return new User({
      ...props,
      id: null,
      groups: [2], // Guest group
    });
  }

  static createFromExisting(props: UserProps): User {
    if (!props.id) {
      throw new RequiredField('id');
    }
    return new User(props);
  }
}
