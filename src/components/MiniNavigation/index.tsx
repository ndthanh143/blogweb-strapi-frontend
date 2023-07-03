import * as React from 'react';
import { DetailsHTMLAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';

export interface ModalProps extends DetailsHTMLAttributes<HTMLDivElement> {
  isOpen?: Boolean;
}

export function MiniNavigation({ isOpen, children, className }: PropsWithChildren<ModalProps>) {
  return (
    <div
      className={cx(
        'fixed bg-white flex justify-center lg:hidden dark:bg-dark-mode dark:text-white inset-0 text-center transition-all duration-300 ease-in-out z-10',
        isOpen ? 'w-full' : 'w-0 overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  );
}
