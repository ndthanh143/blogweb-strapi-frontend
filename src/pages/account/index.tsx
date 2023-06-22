import Logo from '@/assets/logo';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export default function Account() {
  return (
    <div className="flex justify-center items-center">
      <span className="my-40 animate-spin ">
        <Logo />
      </span>
    </div>
  );
}

Account.Layout = 'UserManagement';
