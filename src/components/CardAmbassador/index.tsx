import React from 'react';
import Typo from 'components/Typo';

const CardAmbassador = () => {
  return (
    <div className="mx-4 p-8 cursor-pointer rounded-2xl shadow-lg text-center bg-white">
      <div className="w-20 h-20 mx-auto">
        <img
          src="/slider.png"
          alt="avatar"
          className="w-full h-full rounded-full"
        />
      </div>
      <Typo className="my-4" size="large" isBold>
        Thu Hoài
      </Typo>
      <Typo>10.000.000VND</Typo>
    </div>
  );
};

export default CardAmbassador;
