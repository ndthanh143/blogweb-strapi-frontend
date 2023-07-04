import Logo from '@/assets/logo';
import { resetStateError } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/store';
import { RegisterPayload } from '@/services/auth/auth.dto';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { object, ref, string } from 'yup';
import cx from 'classnames';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Button, Input } from '@/components';

type RegisterField = RegisterPayload & {
  confirmPassword: string;
};

const schema = object({
  username: string().required('Required'),
  email: string().required('Required').email('This field has to be email type'),
  password: string()
    .required('Required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  confirmPassword: string()
    .required('Required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([ref('password')], 'Password does not match'),
});
export default function SignUp() {
  const { t } = useTranslation('register');

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { user, loading, error, register: doRegister } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterField>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (registerData: RegisterPayload) => doRegister(registerData);

  const translate = {
    title: t('title'),
    register: t('register'),
    error: t('error'),
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
    <div className="container h-screen flex items-center justify-center text-center">
      <div className="w-full lg:w-1/2 shadow-2xl dark:shadow-blue-500/50 p-6 sm:p-12 bg-white dark:bg-dark-mode rounded-lg overflow-hidden ">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Link href="/" className="flex justify-center">
            <Logo />
          </Link>
          <p className="font-bold text-lg sm:text-xl lg:text-2xl my-4">{translate.title}</p>
          {error && <p className="bg-red-50 dark:bg-dark-mode text-red-500 py-2 rounded-md">{translate.error}</p>}

          <Input
            {...register('username')}
            placeholder="Username"
            startDecorator={<FaUser />}
            className={cx('my-2', errors.username && '!border-red-500 my-0')}
          />
          <p className="text-red-500 text-left text-sm mb-2">{errors.username?.message}</p>

          <Input
            {...register('email')}
            placeholder="Email"
            startDecorator={<MdEmail />}
            className={cx('my-2', errors.email && '!border-red-500 my-0')}
          />
          <p className="text-red-500 text-left text-sm mb-2">{errors.email?.message}</p>

          <Input
            {...register('password')}
            type="password"
            placeholder="Password"
            startDecorator={<FaLock />}
            className={cx('my-2', errors.password && '!border-red-500 my-0')}
          />
          <p className="text-red-500 text-left text-sm mb-2">{errors.password?.message}</p>
          <Input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm your password"
            startDecorator={<FaLock />}
            className={cx('my-2', errors.confirmPassword && '!border-red-500 my-0')}
          />
          <p className="text-red-500 text-left text-sm mb-2">{errors.confirmPassword?.message}</p>
          <Button
            variant="solid"
            loading={loading}
            loadingPosition="start"
            className="w-full my-4"
            aria-label="Register - Click to register account"
          >
            {translate.register}
          </Button>
        </form>
        {/* <div>
          <div className="font-semibold text-xl text-blue-500 py-4 ">Login with others ways</div>
          <div className="grid grid-cols-3 gap-4 text-xs lg:text-lg">
            <Button variant="outlined" className="col-span-1 flex items-center justify-center">
              <span className="mx-2 text-blue-600">
                <FaFacebook />
              </span>
              Facebook
            </Button>
            <Button variant="outlined" className="col-span-1 flex items-center justify-center">
              <span className="mx-2 text-red-500">
                <FaGoogle />
              </span>
              Google
            </Button>
            <Button variant="outlined" className="col-span-1 flex items-center justify-center">
              <span className="mx-2">
                <FaGithub />
              </span>
              Github
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

SignUp.Layout = 'Empty';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale || 'en', ['common', 'register'])) },
  };
};
