import { BasePaginationResponse, BaseSingleResponse } from './base';
import { Media } from './media.dto';

export type AuthorResponse = BaseSingleResponse<Author>;

export type AuthorsResponse = BasePaginationResponse<Author>;

export interface Author {
  username: string;
  email: string;
  provider: Provider;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  major: string;
  about: string;
  name: string;
  avatar?: Media;
}

export enum Provider {
  Local = 'local',
}
