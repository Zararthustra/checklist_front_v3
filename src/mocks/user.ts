import { ILoginRequest, ILoginResponse, IUser } from '@interfaces/index';

export const userMock: IUser = {
  id: 1,
  username: 'user1',
  email: 'user@mail.com',
  phone: '+33653489625',
  birthdate: '16/05/1986'
};

export const loginRequestMock: ILoginRequest = {
  username: 'user1',
  password: 'password'
};

export const loginResponseMock: ILoginResponse = {
  access:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNTUzMjY3LCJpYXQiOjE3MDExNTcyOTAsImp0aSI6IjQ2MmM0NzA3OGIxZDQ3NzI5ODA0MThlODBmNWFiYWIzIiwidXNlcl9pZCI6MSwibmFtZSI6ImFydGh5In0.UmjJeEiRJx9jfe1dB9Y4-OKEoXRle_VA72t3Z_xoa35',
  refresh:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNTUzMjY3LCJpYXQiOjE3MDExNTcyOTAsImp0aSI6IjQ2MmM0NzA3OGIxZDQ3NzI5ODA0MThlODBmNWFiYWIzIiwidXNlcl9pZCI6MSwibmFtZSI6ImFydGh5In0.UmjJeEiRJx9jfe1dB9Y4-OKEoXRle_VA72t3Z_xoa34'
};
