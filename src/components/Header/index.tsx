import { useTheme } from 'next-themes';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';
import Logo from '@/assets/logo';
import useBoolean from '@/hooks/useBoolean';
import { MdLogin, MdLogout, MdNote } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { Avatar } from '@/components';
import { TfiPencilAlt } from 'react-icons/tfi';
import { getStrapiMedia } from '@/utils/media';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useTranslation } from 'next-i18next';
import cx from 'classnames';
import { Button, Input, MiniNavigation, Popper, Select, SwitchMode } from '@/components';

export type SearchPayload = {
  searchQuery: string;
};

const schema = object({
  searchQuery: string().required('is Required'),
});

export function Header() {
  const { t } = useTranslation('header');

  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const { value: isOpenMenu, setFalse: closeMenu, toggle: toggleMenu } = useBoolean(false);

  const { value: isOpenDropdown, setFalse: closeDropdown, toggle: toggleDropdown } = useBoolean(false);

  const { register, handleSubmit } = useForm<SearchPayload>({ resolver: yupResolver(schema) });

  const { user, logout } = useAuth({});

  const translate = {
    home: t('home'),
    blog: t('blog'),
    signIn: t('signIn'),
    signUp: t('signUp'),
    write: t('write'),
    personal: t('personal'),
    yourPost: t('yourPost'),
    account: t('account'),
    logout: t('logout'),
  };

  const { pathname, asPath, query, locale } = router;

  const onSubmitHandler = ({ searchQuery }: SearchPayload) => {
    router.push(`/search?q=${searchQuery}`);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="container grid grid-cols-3 lg:grid-cols-12 justify-between mx-auto py-6">
      <div className="lg:hidden col-span-1 z-20 order-1">
        <span className="text-4xl cursor-pointer flex" onClick={toggleMenu}>
          <AiOutlineMenu />
        </span>
      </div>
      <MiniNavigation isOpen={isOpenMenu}>
        <div className="w-full pt-2 px-4">
          <ul className="col-span-5 text-color-bold dark:text-white ">
            <Link
              href="/"
              className="px-4 mx-2 py-4 cursor-pointer hover:bg-gray-200 transition-all duration-100 rounded-lg dark:hover:bg-slate-500 active:bg-gray-300 dark:active:bg-slate-700 block"
              onClick={closeMenu}
            >
              {translate.home}
            </Link>
            <Link
              href="/blog"
              className="px-4 mx-2 py-4 cursor-pointer hover:bg-gray-200 transition-all duration-100 rounded-lg dark:hover:bg-slate-500 active:bg-gray-300 dark:active:bg-slate-700 block"
              onClick={closeMenu}
            >
              {translate.blog}
            </Link>
          </ul>
        </div>
      </MiniNavigation>
      <Link
        href="/"
        className="flex justify-center items-center lg:flex lg:h-full text-black dark:text-white lg:col-span-2 order-1"
      >
        <Logo />
      </Link>
      <ul className="hidden lg:flex md:col-span-4 lg:col-span-3 justify-center items-center text-color-bold dark:text-white order-2">
        <li className="px-4 mx-2 py-2 cursor-pointer hover:bg-gray-200 transition-all duration-100 rounded-lg dark:hover:bg-slate-500">
          <Link href="/">{translate.home}</Link>
        </li>
        <li className="px-4 mx-2 py-2 cursor-pointer hover:bg-gray-200 transition-all duration-100 rounded-lg dark:hover:bg-slate-500">
          <Link href="/blog">{translate.blog}</Link>
        </li>
      </ul>
      <form
        className={cx('order-7 mt-5 lg:m-0 lg:order-3 lg:block col-span-3', user && 'col-span-4')}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Input
          placeholder="Search"
          endDecorator={<BiSearch />}
          className="bg-gray-100 dark:bg-search-dark dark:border-dark-mode"
          {...register('searchQuery')}
        />
      </form>
      <div
        className={cx(
          'lg:col-span-2 text-color-primary order-4 flex items-center justify-end',
          user && 'lg:!col-span-1',
        )}
      >
        {user ? (
          <div className="flex justify-end items-center relative">
            <div className="relative">
              <Avatar
                src={
                  user.avatar &&
                  getStrapiMedia(
                    user.avatar.formats.thumbnail ||
                      user.avatar.formats.small ||
                      user.avatar.formats.medium ||
                      user.avatar.formats.large,
                  )
                }
                width={40}
                height={40}
                alt={(user.avatar && user.avatar.alternativeText) || ''}
                onClick={toggleDropdown}
                size={(user.avatar && user.avatar.formats.thumbnail + '') || ''}
              />
              <Popper isOpen={isOpenDropdown} onClose={closeDropdown} onItemClick={closeDropdown}>
                <Link
                  href="/publish/post"
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8"
                >
                  <TfiPencilAlt />
                  <span className="ml-3">{translate.write}</span>
                </Link>
                <Link
                  href={`/writer/${user.id}`}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8"
                >
                  <FaUser />
                  <span className="ml-3">{translate.personal}</span>
                </Link>
                <Link
                  href="/account"
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8"
                >
                  <ImProfile />
                  <span className="ml-3">{translate.account}</span>
                </Link>
                <Link
                  href="/"
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8"
                >
                  <MdNote />
                  <span className="ml-3">{translate.yourPost}</span>
                </Link>
                <div
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8 border-t dark:border-dark-mode"
                  onClick={handleLogout}
                >
                  <MdLogout />
                  <span className="ml-3">{translate.logout}</span>
                </div>
              </Popper>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <span className="px-2 text-3xl lg:text-base lg:hidden" onClick={() => router.push('/login')}>
              <MdLogin />
            </span>
            <span className="hidden lg:flex text-sm">
              <Button
                variant="text"
                className="mx-1"
                onClick={() => router.push('/login')}
                aria-label={translate.signIn}
              >
                {translate.signIn}
              </Button>
              <Button
                variant="solid"
                className="mx-1"
                onClick={() => router.push('/register')}
                aria-label={translate.signUp}
              >
                {translate.signUp}
              </Button>
            </span>
          </div>
        )}
      </div>
      <div className="col-span-1 hidden lg:flex justify-end order-5">
        <Select
          defaultValue={locale || 'en'}
          onChange={(e) => router.push({ pathname, query }, asPath, { locale: e.target.value })}
          className="w-fit pr-4 border-blue-400 text-blue-500 outline-none dark:border-blue-600"
        >
          <option value="en">ENG</option>
          <option value="vi">VI</option>
        </Select>
      </div>
      <div className="hidden lg:flex col-span-1 flex-row-reverse order-6">
        <SwitchMode onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))} />
      </div>
    </div>
  );
}
