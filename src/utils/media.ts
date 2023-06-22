import { ImageType } from '@/dtos/media.dto';

export function getStrapiURL(path: string = '') {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export function getStrapiMedia(image: ImageType) {
  const { url } = image;

  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
}
