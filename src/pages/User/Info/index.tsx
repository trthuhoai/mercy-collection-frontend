import React from 'react';
import Typo from 'components/Typo';
import { useUser } from 'store';

const Info = () => {
  const { user } = useUser();

  return (
    <div className="my-10">
      <div className="h-52 bg-gradient-to-r from-violet-100 via-purple-100 to-pink-100 rounded-tl-[90px]" />
      <div className="container">
        <div className="flex gap-6 -translate-y-1/2 ">
          <div className="w-36 h-36">
            <img
              src={user?.picture || '/avartar.png'}
              alt="Anh dai dien"
              className="rounded-full w-full h-full"
            />
          </div>
          <div className="self-end">
            <Typo className="mb-2" size="larger" isBold>
              {user?.name}
            </Typo>
            <Typo>{user?.email}</Typo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
