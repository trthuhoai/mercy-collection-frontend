import React from 'react';
import CardAmbassador from 'components/CardAmbassador';
import Sliders from 'components/Slider';
import Typo from 'components/Typo';
import { Link } from 'react-router-dom';

const AmbassadorList = () => {
  return (
    <div className="mb-16">
      <Typo isBold size="larger" className="text-center">
        Sứ giả
      </Typo>
      <Typo className="text-center my-8">
        Bạn có thể trở thành sứ giả gây quỹ cho các dự án bằng cách ủng hộ gây
        quỹ hoặc tham gia tình nguyện với mục tiêu của riêng mình.
      </Typo>
      <Sliders slidesToScroll={5} slidesToShow={5} isDot={false}>
        <CardAmbassador />
        <CardAmbassador />
        <CardAmbassador />
        <CardAmbassador />
        <CardAmbassador />
        <CardAmbassador />
        <CardAmbassador />
      </Sliders>
      <div className="text-center mt-4">
        <Link to="#" className="text-primary-500">
          Xem tất cả (15)
        </Link>
      </div>
    </div>
  );
};

export default AmbassadorList;
