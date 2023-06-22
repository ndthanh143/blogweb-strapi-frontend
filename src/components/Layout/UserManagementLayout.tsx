import { PropsWithChildren } from 'react';
import AccountNavbar from '../UserManagement/accountNavbar/AccountNavbar';
import UserManagementHeader from '../UserManagement/header/UserManagementHeader';
import { useAuth } from '@/hooks/useAuth';

export default function UserManagementLayout({ children }: PropsWithChildren) {
  const { user } = useAuth({ redirectTo: '/login' });

  if (!user) return null;

  return (
    <>
      <UserManagementHeader />
      <div className="flex">
        <AccountNavbar className="w-fit border-r" />
        <main className="m-6 p-6 border flex-1">{children}</main>
      </div>
    </>
  );
}
