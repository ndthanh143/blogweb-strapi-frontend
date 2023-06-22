import { AuthContext } from '@/components';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

interface UseAuthProps {
  redirectTo?: string;
}

export const useAuth = ({ redirectTo }: UseAuthProps = {}) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (redirectTo && authContext.isAuthenticated === false) {
      router.push(redirectTo);
    }
  }, [authContext.isAuthenticated, router, redirectTo]);

  return authContext;
};
