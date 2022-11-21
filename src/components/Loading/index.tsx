import React from 'react';
import clsx from 'clsx';

interface IProps {
  fixed?: boolean;
}
const Loading = ({ fixed = false }: IProps) => {
  return (
    <div
      className={clsx('z-50 w-full text-center my-4', {
        'fixed inset-0 flex items-center justify-center': fixed,
      })}
    >
      {fixed && <div className="absolute inset-0 bg-black opacity-30" />}
      <div className="loader" />
    </div>
  );
};

export default Loading;
