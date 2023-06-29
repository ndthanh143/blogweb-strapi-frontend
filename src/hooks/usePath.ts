import { useRouter } from 'next/router';

export const usePath = () => {
  const router = useRouter();

  const currentUrl = process.env.NEXT_PUBLIC_SITE_URL + router.asPath;

  return { currentUrl };
};
