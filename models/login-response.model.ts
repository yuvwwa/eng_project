export type TokenObjectModel = {
  access_token: string;
  refresh_token: string;
};

export type PersonModel = {
  is: number;
  name: string;
  email: string | null;
  gender: string | null;
  birthDate: number | null;
  isDeleted: boolean;
};

export interface ILoginJWTDecode {
  role: string;
  person: PersonModel;
}

export type UserCredentials = {
  email: string;
  password: string;
};
