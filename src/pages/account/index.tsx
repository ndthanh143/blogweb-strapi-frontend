import Logo from '@/assets/logo';

export default function Account() {
  return (
    <div className="flex justify-center items-center">
      <span className="my-40 animate-pulse ">
        <Logo />
      </span>
    </div>
  );
}

Account.Layout = 'UserManagement';
