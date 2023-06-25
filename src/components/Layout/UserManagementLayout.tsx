import { PropsWithChildren } from 'react';
import AccountNavbar from '../UserManagement/accountNavbar/AccountNavbar';
import UserManagementHeader from '../UserManagement/header/UserManagementHeader';
import { useAuth } from '@/hooks/useAuth';

export default function UserManagementLayout({ children }: PropsWithChildren) {
  const { user } = useAuth({ redirectTo: '/login' });

  return (
    <>
      <UserManagementHeader />
      <div className="flex w-full my-4 h-fit mt-20">
        <AccountNavbar className="w-fit pb-20" />
        <main className="mx-6 p-6 h-fit border flex-1 w-full overscroll-none">{children}</main>
      </div>
    </>
  );
}
