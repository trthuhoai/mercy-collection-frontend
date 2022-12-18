import React, { useEffect, useState } from 'react';
import CardAmbassador from 'components/CardAmbassador';
import Sliders from 'components/Slider';
import Typo from 'components/Typo';
import { Link } from 'react-router-dom';
import { IAmbassador } from './types';
import { getAmbassador } from 'apis/statistic';

const AmbassadorList = () => {
  const [ambassador, setAmbassador] = useState<IAmbassador[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getAmbassador();
      setAmbassador(data);
    })();
  }, []);

  return (
    <div className="mb-16">
      <Typo isBold size="larger" className="text-center">
        Sứ giả
      </Typo>
      <Typo className="text-center my-8">
        Bạn có thể trở thành sứ giả cho các dự án bằng cách tổ chức hoặc tham
        gia tình nguyện với mục tiêu của riêng mình.
      </Typo>
      <Sliders slidesToScroll={5} slidesToShow={5} isDot={false}>
        {ambassador.map(am => (
          <div className="px-4 h-full">
            <CardAmbassador {...am} />
          </div>
        ))}
        {/* <CardAmbassador />
        <CardAmbassador />
        <CardAmbassador />
        <CardAmbassador />
        <CardAmbassador />
        <CardAmbassador />
        <CardAmbassador /> */}
      </Sliders>
      <div className="text-center mt-4">
        <Link to="#" className="text-primary-500">
          Tất cả ({ambassador.length})
        </Link>
      </div>
    </div>
  );
};

export default AmbassadorList;
