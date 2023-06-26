'use client';

import { HTMLAttributes, ReactNode, useState } from 'react';
import { BsPersonFill, BsPersonVcardFill } from 'react-icons/bs';
import { MdHome, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdSecurity } from 'react-icons/md';
import { TfiAngleDown } from 'react-icons/tfi';
import useBoolean from '@/hooks/useBoolean';
import { HiKey } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import cx from 'classnames';

export interface NavbarSubMenuProps extends HTMLAttributes<HTMLDivElement> {
  startIcons?: ReactNode;
  title?: string;
  href?: string;
  isCollapse?: boolean;
}

export const NavbarSubMenu = ({ startIcons, title, children, className, isCollapse }: NavbarSubMenuProps) => {
  const { value, toggle } = useBoolean(false);
  return (
    <div>
      <div
        className={cx('flex items-center relative cursor-pointer pl-4 pr-10 hover:bg-blue-200', className)}
        onClick={toggle}
      >
        {startIcons}
        <span className={cx('mx-4', isCollapse && 'hidden')}>{title}</span>
        <TfiAngleDown className={cx('text-xs transition-all duration-200 absolute right-4', value && 'rotate-180 ')} />
      </div>
      <div
        className={cx(
          'h-0 w-0 transition-all duration-200 overflow-hidden',
          value && '!h-full !w-full transition-all duration-200',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const NavbarSubMenuItem = ({ children, href = '#' }: NavbarSubMenuProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center px-12 py-2 cursor-pointer hover:bg-blue-200" onClick={() => router.push(href)}>
      {children}
    </div>
  );
};

export const SubMenuItem = ({ children, href, className, ...props }: NavbarSubMenuProps) => {
  const router = useRouter();

  return (
    <div
      className={cx('flex items-center py-2 cursor-pointer pl-4 pr-10 hover:bg-blue-200', className)}
      {...(href && { onClick: () => router.push(href) })}
      {...props}
    >
      {children}
    </div>
  );
};

export default function AccountNavbar({ className }: HTMLAttributes<HTMLDivElement>) {
  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <div>
      <div
        className={cx(
          'text-base text-color-bold dark:text-color-bold-dark transition-all duration-100 disable flex flex-col h-screen justify-between',
          isCollapse && '!text-2xl',
          className,
        )}
      >
        <div className="border-r flex-1">
          <SubMenuItem href="/account">
            <MdHome />
            <span className={cx('mx-4', isCollapse && 'hidden')}>Home</span>
          </SubMenuItem>
          <NavbarSubMenu startIcons={<BsPersonVcardFill />} title="My Profile" className="py-2" isCollapse={isCollapse}>
            <NavbarSubMenuItem href="/account/profile/personal" isCollapse>
              <BsPersonFill />
              <span className={cx('mx-4', isCollapse && 'hidden')}>Personal Info</span>
            </NavbarSubMenuItem>
          </NavbarSubMenu>
          <NavbarSubMenu startIcons={<MdSecurity />} title="Security" className="py-2" isCollapse={isCollapse}>
            <NavbarSubMenuItem href="/account/security/password">
              <HiKey />
              <span className={cx('mx-4', isCollapse && 'hidden')}> Password</span>
            </NavbarSubMenuItem>
          </NavbarSubMenu>
        </div>
        <SubMenuItem className="border-t border-r border-b" onClick={() => setIsCollapse(!isCollapse)}>
          {isCollapse ? <MdKeyboardDoubleArrowRight /> : <MdKeyboardDoubleArrowLeft />}
          <span className={cx('mx-4', isCollapse && 'hidden')}>Collapse</span>
        </SubMenuItem>
      </div>
    </div>
  );
}
