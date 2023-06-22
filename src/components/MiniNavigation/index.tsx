import * as React from 'react';
import { PropsWithChildren } from 'react';
import cx from 'classnames';

export interface ModalProps {
  isOpen?: Boolean;
}

export function MiniNavigation({ isOpen, children }: PropsWithChildren<ModalProps>) {
  return (
    <div
      className={cx(
        'fixed bg-white flex justify-center lg:hidden dark:bg-dark-mode dark:text-white inset-0 text-center transition-all duration-300 ease-in-out z-10 top-20',
        isOpen ? 'w-full' : 'w-0 overflow-hidden',
      )}
    >
      {children}
    </div>
  );
}
