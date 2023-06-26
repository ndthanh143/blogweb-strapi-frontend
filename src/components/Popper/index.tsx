import { HTMLAttributes, PropsWithChildren, useEffect, useRef } from 'react';
import cx from 'classnames';

export interface PopperProps extends HTMLAttributes<PropsWithChildren> {
  isOpen: boolean;
  onClose: () => void;
  onItemClick?: () => void;
}

export function Popper({ isOpen, onClose, onItemClick = () => {}, className, children }: PopperProps) {
  const popperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popperRef.current && !popperRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popperRef}
      className={cx(
        'absolute -bottom-1 right-0 translate-y-full bg-white dark:bg-dark-mode text-color-thin dark:text-color-thin-dark font-semibold z-10 border dark:border-dark-mode min-w-max rounded-md overflow-hidden origin-top-right transition-all duration-400',
        isOpen ? 'scale-1' : ' scale-0',
        className,
      )}
    >
      <div onClick={onItemClick}>{children}</div>
    </div>
  );
}
