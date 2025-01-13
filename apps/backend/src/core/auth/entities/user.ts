import { RequiredField } from '../errors';

type baseUserProps = {
  email: string;
  password: string;
  name: string;
  recoverToken?: string;
  phoneNumber?: string;
  groups: { id: number; name: string | null }[];
};
type UserProps = baseUserProps & {
  id?: number;
};

type CreateFormExistingProps = baseUserProps & {
  id: number;
};

type UserCreateGuestProps = {
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
  groups: { id: number; name: string | null }[];

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
      groups: [{ id: 2, name: 'Guest' }], // Guest group
    });
  }

  static createFromExisting(props: CreateFormExistingProps): User {
    if (!props.id) {
      throw new RequiredField('id');
    }
    return new User(props);
  }
}
