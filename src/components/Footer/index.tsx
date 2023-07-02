import { FiMail } from 'react-icons/fi';
import { useContext } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Button, Input } from '@/components';
import Logo from '@/assets/logo';
import { useAppSelector } from '@/redux/store';

export function Footer() {
  const { t } = useTranslation('footer');

  const { data } = useAppSelector((state) => state.categories);

  const translate = {
    about: t('about'),
    aboutContent: t('aboutContent'),
    quickLink: t('quickLink'),
    category: t('category'),
    home: t('home'),
    blog: t('blog'),
    terms: t('terms'),
    privacy: t('privacy'),
    cookie: t('cookie'),
    formTitle: t('formTitle'),
    formDesc: t('formDesc'),
    formInputPlaceHolder: t('formInputPlaceHolder'),
    subscribe: t('subscribe'),
  };

  return (
    <div className="bg-footer-color dark:bg-footer-color-dark">
      <div className="lg:container mx-auto">
        <div className="grid lg:grid-cols-6 grid-cols-1 text-center lg:text-left place-items-stretch gap-x-20 border-b-2 dark:border-dark-mode py-6">
          <div className="text-color-medium dark:text-color-medium-dark text-sm lg:col-span-2 py-4">
            <h1 className="text-color-bold dark:text-color-bold-dark text-base font-bold mb-3">{translate.about}</h1>
            <p className="mb-3 text-color-thin dark:text-color-thin-dark">{translate.aboutContent}</p>
            <p className="dark:text-color-thin-dark">
              <span className="text-base font-bold text-color-bold dark:text-color-bold-dark">Email: </span>
              alex.nguyen.goldenowl@gmail.com
            </p>
            <p className="dark:text-color-thin-dark">
              <span className="text-base font-bold text-color-bold dark:text-color-bold-dark">Phone: </span>
              +84 35 456 0042
            </p>
          </div>
          <div className="lg:col-span-1 text-color-medium dark:text-color-medium-dark text-sm py-4">
            <h1 className="text-color-bold dark:text-color-bold-dark text-base font-bold mb-3">
              {translate.quickLink}
            </h1>
            <Link href="/" className="mb-2 hover:text-red-500 block">
              {translate.home}
            </Link>
            <Link href={`/category/${data?.[0]?.attributes.slug}`} className="mb-2 hover:text-red-500 block">
              {translate.blog}
            </Link>
          </div>
          <div className="lg:col-span-1 text-color-medium dark:text-color-medium-dark text-sm py-4">
            <h1 className="text-color-bold dark:text-color-bold-dark text-base font-bold mb-3">{translate.category}</h1>
            {data.length > 0 &&
              data.map((item) => (
                <Link
                  href={`/category/${item.attributes.slug}`}
                  className="mb-2 hover:text-red-500 block w-full"
                  key={item.id}
                >
                  {item.attributes.name}
                </Link>
              ))}
          </div>
          <div className="lg:col-span-2 bg-white text-center px-6 rounded-lg dark:bg-input-dark py-4">
            <h1 className="font-bold mb-1 dark:text-color-bold-dark text-xl">{translate.formTitle}</h1>
            <p className="mb-8 dark:text-color-blur">{translate.formDesc}</p>
            <Input placeholder={translate.formInputPlaceHolder} endDecorator={<FiMail />} />
            <Button variant="solid" type="submit" className="mt-3 w-full" aria-label="Subcribe Email">
              {translate.subscribe}
            </Button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 text-center lg:text-left items-center py-6">
          <div className="flex justify-center lg:col-span-2 lg:justify-start py-4">
            <Logo />
          </div>
          <div className="lg:col-span-1 lg:flex justify-between text-sm text-color-medium dark:text-color-medium-dark">
            <Link href="/" className="px-4 py-4 hover:text-red-500">
              {translate.terms}
            </Link>
            <Link href="/" className="px-4 py-4 hover:text-red-500">
              {translate.privacy}
            </Link>
            <Link href="/" className="px-4 py-4 hover:text-red-500">
              {translate.cookie}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
