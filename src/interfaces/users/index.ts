export interface IUserRequest {
  name: string;
  email: string;
  isAdm: boolean;
  isActive?: boolean;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}
