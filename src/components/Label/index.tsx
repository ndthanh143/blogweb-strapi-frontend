import { HTMLAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';

export interface LabelProps {
  color: 'primary' | 'secondary';
}

export function Label({ color, children, className }: HTMLAttributes<PropsWithChildren<LabelProps>>) {
  console.log('renrerrrr');
  return (
    <span
      className={cx(
        'px-4 py-1 rounded-lg font-medium',
        color === 'primary'
          ? 'bg-color-primary text-white'
          : 'bg-label-light text-color-primary dark:bg-label-dark hover:bg-color-primary dark:hover:bg-color-primary hover:text-white',
        className,
      )}
    >
      {children}
    </span>
  );
}
