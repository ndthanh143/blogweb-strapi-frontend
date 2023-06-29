import { Label, Avatar } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import { getStrapiMedia } from '../../utils/media';
import { Article } from '@/services/article/article.dto';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderSlick from 'react-slick';
import { CSSProperties } from 'react';
import moment from 'moment';
import { BaseResponseData } from '@/dtos/base';
import { useRouter } from 'next/router';

export interface SliderProps {
  data: BaseResponseData<Article>[];
}

export interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const SliderPrevArrow = ({ onClick }: ArrowProps) => {
  return (
    <div onClick={onClick}>
      <TfiAngleLeft className="absolute hidden lg:block cursor-pointer z-10 text-5xl top-1/2 -translate-y-1/2 text-white opacity-50 hover:opacity-100" />
    </div>
  );
};

const SliderNextArrow = ({ onClick }: ArrowProps) => {
  return (
    <div onClick={onClick}>
      <TfiAngleRight className="absolute hidden lg:block cursor-pointer z-10 right-0 text-5xl top-1/2 -translate-y-1/2 text-white opacity-50 hover:opacity-100" />
    </div>
  );
};

export function Slider({ data }: SliderProps) {
  const { locale } = useRouter();

  moment.locale(locale || 'en');
  return (
    <div className="rounded-lg">
      <SliderSlick
        dots={false}
        autoplay
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        prevArrow={<SliderPrevArrow />}
        nextArrow={<SliderNextArrow />}
      >
        {data.map((item) => (
          <div className="rounded-lg relative aspect-[16/9] lg:aspect-[16/7] outline-none" key={item.id}>
            <Image
              src={getStrapiMedia(
                item.attributes.thumbnail.data.attributes.formats.large ||
                  item.attributes.thumbnail.data.attributes.formats.medium ||
                  item.attributes.thumbnail.data.attributes.formats.small ||
                  item.attributes.thumbnail.data.attributes.formats.thumbnail,
              )}
              alt={item.attributes.thumbnail.data.attributes.alternativeText || ''}
              fill
              style={{
                objectFit: 'contain',
              }}
              className="rounded-lg"
              sizes={item.attributes.thumbnail.data.attributes.formats.large + ''}
              priority
            />
            <Link href={`/blog/${item.attributes.slug}`} aria-label={`Go to ${item.attributes.title} page`}>
              <div className="absolute w-5/6 lg:w-2/5 text-sm drop-shadow-2xl lg:left-16 text-white lg:text-inherit bottom-4 lg:bg-white px-4 lg:px-8 py-4 rounded-lg lg:dark:bg-dark-mode lg:bg-opacity-90">
                <div className="my-4">
                  <Label color="primary">{item.attributes.category.data.attributes.name}</Label>
                </div>
                <p className="block font-bold text-lg lg:text-2xl mb-4 dark:text-color-bold-dark truncate break-all">
                  {item.attributes.title}
                </p>
                <div className="flex items-center drop-shadow-xl lg:text-color-blur">
                  <Avatar
                    src={
                      item.attributes.author.data.attributes.avatar?.data &&
                      getStrapiMedia(item.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail)
                    }
                    width={40}
                    height={40}
                    alt={item.attributes.author.data.attributes.avatar?.data?.attributes.alternativeText || ''}
                    size={item.attributes.author.data.attributes.avatar?.data?.attributes.formats.thumbnail.size + ''}
                  />
                  <p className="ml-2 mr-4 font-medium">{item.attributes.author.data.attributes.name}</p>
                  <p>
                    {moment(item.attributes.publishedAt).format(locale === 'vi' ? 'DD MMMM, YYYY' : 'MMMM DD, YYYY')}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </SliderSlick>
    </div>
  );
}
