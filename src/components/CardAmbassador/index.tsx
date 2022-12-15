import React, { useState } from 'react';
import Typo from 'components/Typo';
import { IAmbassador } from 'pages/Home/AmbassadorList/types';
import { useNavigate, generatePath } from 'react-router-dom';

const CardAmbassador = ({
    id,
    picture,
    name,
    successProject,
  }: IAmbassador) => {
    // const navigate = useNavigate();

  return (
    <div className="mx-4 p-8 cursor-pointer rounded-2xl shadow-lg text-center bg-white">
      <div className="w-20 h-20 mx-auto">
        <img
          src={picture || '/avartar.png'}
          alt="avatar"
          className="w-full h-full rounded-full"
        />
      </div>
      <Typo className="my-4" size="large" isBold>
        {name}
      </Typo>
      <Typo>{successProject} dự án</Typo>
    </div>
  );
};

export default CardAmbassador;
