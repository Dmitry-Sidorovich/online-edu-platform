import { Request } from 'express';

export interface RegistrationRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
    role: string;
  };
}

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface DeleteUserRequest extends Request {
  params: {
    id: string;
  };
}
