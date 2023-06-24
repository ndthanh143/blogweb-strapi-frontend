import Logo from '@/assets/logo';
import Link from 'next/link';
import { FaLock } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { LoginPayload } from '@/services/auth/auth.dto';
import { useEffect } from 'react';
import { SEO } from '@/services/homepage/homepage.dto';
import { useAuth } from '@/hooks/useAuth';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Button, Input, Seo } from '@/components';
import { useAppDispatch } from '@/redux/store';
import { resetStateError } from '@/redux/features/auth/authSlice';

const schema = object({
  identifier: string().required('Required'),
  password: string().required('Required'),
});

export default function Login() {
  const { t } = useTranslation('login');

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { user, loading, error, login } = useAuth();

  const { register, handleSubmit } = useForm<LoginPayload>({ resolver: yupResolver(schema) });

  const onSubmitHandler = (loginData: LoginPayload) => login(loginData);

  const seo: SEO = {
    metaTitle: 'Login',
  };

  const translate = {
    title: t('title'),
    forgotPassword: t('forgotPassword'),
    register: t('register'),
    login: t('login'),
    error: t('error'),
    password: t('password'),
  };

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, router, loading]);

  useEffect(() => {
    if (error) {
      dispatch(resetStateError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Seo seo={seo} />
      <div className="h-screen flex items-center justify-center text-center">
        <div className="w-3/4 lg:w-1/2 shadow-2xl dark:shadow-blue-500/50 p-12 bg-white dark:bg-dark-mode rounded-lg overflow-hidden ">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Link href="/" className="flex justify-center">
              <Logo />
            </Link>
            <p className="font-bold text-xl lg:text-2xl my-4">{translate.title}</p>
            {error && <div className="bg-red-50 dark:bg-dark-mode text-red-500 py-2 rounded-md">{translate.error}</div>}
            <Input {...register('identifier')} placeholder="Email" startDecorator={<FaUser />} className="my-2" />
            <Input
              {...register('password')}
              type="password"
              placeholder={translate.password}
              startDecorator={<FaLock />}
              className="my-2"
            />
            <Button
              variant="solid"
              disabled={loading}
              loading={loading}
              loadingPosition="start"
              className="w-full my-4"
              aria-label="Login - CLick to login to Go Blog"
            >
              {translate.login}
            </Button>
            <div className="flex justify-between text-blue-400 ">
              <Link href="/forgot-password" className="hover:text-red-500">
                {translate.forgotPassword}
              </Link>
              <Link href="/register" className="hover:text-red-500">
                {translate.register}
              </Link>
            </div>
          </form>
          {/* <div>
            <h1 className="font-semibold text-xl relative text-blue-500 py-4">Login with others ways</h1>
            <div className="grid grid-cols-3 gap-4 text-xs lg:text-lg">
              <Button variant="outlined" className="col-span-1 flex items-center justify-center">
                <span className="mx-2 text-blue-600">
                  <FaFacebook />
                </span>
                <span className="mr-2"> Facebook</span>
              </Button>
              <Button variant="outlined" className="col-span-1 flex items-center justify-center">
                <span className="mx-2 text-red-500">
                  <FaGoogle />
                </span>
                <span className="mr-2"> Google</span>
              </Button>
              <Button variant="outlined" className="col-span-1 flex items-center justify-center">
                <span className="mx-2">
                  <FaGithub />
                </span>
                <span className="mr-2"> Github</span>
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

Login.Layout = 'Empty';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale || 'en', ['common', 'login'])) },
  };
};
