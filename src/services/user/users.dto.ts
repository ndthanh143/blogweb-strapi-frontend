import { Article } from '../article/article.dto';
import { Formats } from '../../dtos/media.dto';
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
  avatar?: Avatar;
}

export interface Avatar {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
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
