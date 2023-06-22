import { BaseResponse, BaseSingleResponse } from '../../dtos/base';

export interface GlobalResponse {
  data: GlobalResponseData;
  meta: Meta;
}

export interface GlobalResponseData {
  id: number;
  attributes: GlobalAttributes;
}

export interface GlobalAttributes {
  siteName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  favicon?: Favicon;
  defaultSeo?: DefaultSEO;
}

export interface DefaultSEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage: BaseSingleResponse<ShareImage>;
}

export interface ShareImage {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: GlobalFormats;
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

export interface GlobalFormats {
  thumbnail: Small;
  small: Small;
  medium: Small;
  large: Small;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Favicon {
  data: FaviconData;
}

export interface FaviconData {
  id: number;
  attributes: FaviconAttributes;
}

export interface FaviconAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: FluffyFormats;
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

export interface FluffyFormats {
  thumbnail: Small;
  small: Small;
}

export interface Meta {}
