export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
  role?: string;
  githubId?: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}
