import Image from 'next/image';
import { HTMLAttributes, memo } from 'react';
import { Avatar, Label } from '@/components';
import cx from 'classnames';
import Link from 'next/link';
import moment from 'moment';
import { getStrapiMedia } from '@/utils/media';
import { Article } from '@/services/article/article.dto';
import { useRouter } from 'next/router';
import 'moment/locale/vi';

type FilterArticle = Omit<Article, 'content' | 'createdAt' | 'updatedAt' | 'description'>;

export type CardProps = (({ isLoading: true } & Partial<FilterArticle>) | ({ isLoading?: false } & FilterArticle)) & {
  isRendered?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Card = memo(
  ({ title, thumbnail, slug, category, author, publishedAt, className, isLoading }: CardProps) => {
    const { locale } = useRouter();

    moment.locale(locale || 'en');

    return (
      <div
        className={cx(
          'w-full h-full p-4 border-2 border-light-mode dark:border-dark-mode rounded-lg hover:border-gray-300 dark:hover:border-gray-300',
          className,
        )}
      >
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
          {isLoading ? (
            <div className="flex items-center justify-center h-full mb-4 bg-gray-300 rounded dark:bg-gray-700 animate-pulse">
              <svg
                className="w-12 h-12 text-gray-200 dark:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          ) : (
            <Link
              href={`/blog/${slug}`}
              className="w-full h-full block relative"
              data-cy="post"
              aria-label={`Go to ${title}`}
            >
              {thumbnail.data && (
                <Image
                  src={getStrapiMedia(
                    thumbnail.data.attributes.formats.small ||
                      thumbnail.data.attributes.formats.thumbnail ||
                      thumbnail.data.attributes.formats.medium ||
                      thumbnail.data.attributes.formats.large,
                  )}
                  alt={thumbnail.data.attributes.alternativeText || ''}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="hover:scale-110 transition-all duration-200"
                  sizes={thumbnail.data.attributes.formats.thumbnail + ''}
                  priority
                />
              )}
            </Link>
          )}
        </div>
        <div className="grid grid-rows-4 mt-4">
          <div className="row-span-1">
            {isLoading ? (
              <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 animate-pulse"></div>
            ) : (
              <Link href={`/category/${category.data.attributes.slug}`}>
                <Label color="secondary">{category.data.attributes.name}</Label>
              </Link>
            )}
          </div>
          {isLoading ? (
            <div className="row-span-2 animate-pulse">
              <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 "></div>
              <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 "></div>
              <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          ) : (
            <p className="font-bold text-lg dark:text-color-bold-dark row-span-2">{title}</p>
          )}

          {isLoading ? (
            <div className="flex items-center">
              <svg
                className="text-gray-200 w-14 h-14 dark:text-gray-700"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <div className="w-48 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
          ) : (
            author && (
              <div className="flex items-center font-sm text-color-blur row-span-1">
                <Link href={`/writer/${author.data.id}`} className="flex items-center">
                  <Avatar
                    src={
                      author.data.attributes.avatar?.data &&
                      getStrapiMedia(author.data.attributes.avatar.data.attributes.formats.thumbnail)
                    }
                    width={40}
                    height={40}
                    alt={author.data.attributes.avatar?.data?.attributes.alternativeText || ''}
                    size={author.data.attributes.avatar?.data?.attributes.formats.thumbnail + ''}
                  />
                  <p className="ml-2 mr-4 font-medium hover:text-color-primary">{author.data.attributes.name}</p>
                </Link>
                <p>{moment(publishedAt).format(locale === 'vi' ? 'DD MMMM, YYYY' : 'MMMM DD, YYYY')}</p>
              </div>
            )
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isRendered === nextProps.isRendered;
  },
);
