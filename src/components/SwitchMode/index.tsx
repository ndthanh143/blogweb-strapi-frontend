import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import cx from 'classnames';

export interface IToggleButtonProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

export function SwitchMode({ onClick, className }: IToggleButtonProps) {
  return (
    <div
      className={cx(
        'bg-toggle-light dark:bg-toggle-dark cursor-pointer w-16 h-10 rounded-full flex items-center',
        className,
      )}
      onClick={onClick}
    >
      <span
        className={cx(
          'translate-x-0 dark:translate-x-3/4 flex items-center justify-center px-2 py-2 rounded-full mx-1 bg-white transition-all duration-200 text-gray-600',
        )}
      >
        <BsFillSunFill />
      </span>
    </div>
  );
}
