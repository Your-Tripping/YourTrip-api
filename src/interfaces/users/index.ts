export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  bio: string;
  imageUrl?: string;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  bio: string;
  imageUrl?: string | null;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  bio?: string;
}
