import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface IProps {
  className?: string;
  size?: 'larger' | 'large' | 'normal';
  isBold?: boolean;
  children: ReactNode;
}
const Typo = ({ className, size = 'normal', isBold, children }: IProps) => {
  return (
    <p
      className={clsx(
        {
          'text-gray-500': size === 'normal',
        },
        {
          'text-2xl': size === 'larger',
        },
        {
          'text-lg': size === 'large',
        },
        {
          'font-semibold': isBold,
        },
        className,
      )}
    >
      {children}
    </p>
  );
};

export default Typo;
