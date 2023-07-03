import { Article } from '../article/article.dto';
import { ImageUpload } from '../media/media.dto';
import { BaseSingleResponse } from '@/dtos/base';

export type UserResponse = BaseSingleResponse<UserResponseData>;

export interface UserResponseData {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  major: string;
  about: string;
  name: string;
  role: Role;
  articles: Article[];
  avatar?: ImageUpload;
}
export interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AuthResponse = {
  jwt: string;
  user: UserResponseData;
};

export type UpdateUserPayload = {
  avatar?: FileList | null;
  name?: string;
  about?: string;
  major?: string;
};
