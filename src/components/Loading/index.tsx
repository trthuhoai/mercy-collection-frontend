import clsx from 'clsx';
import React from 'react';

interface IProps {
  fixed?: boolean;
}
const Loading = ({ fixed = false }: IProps) => {
  return (
    <div
      className={clsx('z-50 text-center', {
        'fixed inset-0 flex items-center justify-center': fixed,
      })}
    >
      {fixed && <div className="absolute inset-0 bg-black opacity-30" />}
      <div className="loader" />
    </div>
  );
};

export default Loading;
