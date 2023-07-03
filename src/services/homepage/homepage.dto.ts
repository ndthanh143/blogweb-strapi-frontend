import { Media } from '../media/media.dto';

export interface HomepageResponse {
  data: HomepageData;
  meta: Meta;
}

export interface HomepageData {
  id: number;
  attributes: HomepageAttributes;
}

export interface HomepageAttributes {
  createdAt: Date;
  updatedAt: Date;
  hero: Hero;
  seo: SEO;
}

export interface Hero {
  id: number;
  title: string;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: Media;
  article?: boolean;
}

export interface Meta {}
