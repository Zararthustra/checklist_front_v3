export type { ILoginRequest, ILoginResponse, IUser };

interface IUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  birthdate: string;
}

interface ILoginResponse {
  refresh: string;
  access: string;
}

interface ILoginRequest {
  username: string;
  password: string;
}
