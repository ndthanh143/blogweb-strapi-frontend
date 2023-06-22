import Logo from '@/assets/logo';
import { Avatar, Popper } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import useBoolean from '@/hooks/useBoolean';
import { getStrapiMedia } from '@/utils/media';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdLogout, MdNote } from 'react-icons/md';
import { TfiPencilAlt } from 'react-icons/tfi';

export interface UserManagementHeaderProps {}

export default function UserManagementHeader(props: UserManagementHeaderProps) {
  const { value: isOpenDropdown, setFalse: closeDropdown, toggle: toggleDropdown } = useBoolean(false);

  const { user, logout } = useAuth();

  return (
    <div className="flex p-4 justify-between mx-2">
      <Link href="/">
        <Logo />
      </Link>
      {user && (
        <div className="flex justify-end items-center relative">
          <div className="relative flex items-center">
            <p className="mx-4">Welcome {user.name}!</p>
            <Avatar
              src={user.avatar && getStrapiMedia(user.avatar.formats.thumbnail)}
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
                <span className="ml-3">Write</span>
              </Link>
              <Link
                href={`/writer/${user.id}`}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8"
              >
                <FaUser />
                <span className="ml-3">Personal</span>
              </Link>
              <Link
                href="/account"
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8"
              >
                <ImProfile />
                <span className="ml-3">Account</span>
              </Link>
              <Link
                href="/"
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8"
              >
                <MdNote />
                <span className="ml-3">your posts</span>
              </Link>
              <div
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8 border-t dark:border-dark-mode"
                onClick={logout}
              >
                <MdLogout />
                <span className="ml-3">Logout</span>
              </div>
            </Popper>
          </div>
        </div>
      )}
    </div>
  );
}
