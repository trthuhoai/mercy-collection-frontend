import React from 'react';
import Card from 'components/Card';
import Sliders from 'components/Slider';
import Typo from 'components/Typo';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  return (
    <div className="mb-16">
      <Typo isBold size="larger" className="text-center">
        Dự án đang gây quỹ
      </Typo>
      <Typo className="text-center my-8">
        Hãy lựa chọn dự án mà bạn quan tâm
      </Typo>
      <Sliders slidesToScroll={3} slidesToShow={3} isDot={false}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Sliders>
      <div className="text-center mt-4">
        <Link to="#" className="text-primary-500">
          Xem tất cả (15)
        </Link>
      </div>
    </div>
  );
};

export default ProjectList;
