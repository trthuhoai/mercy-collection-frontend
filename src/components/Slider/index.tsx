import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

interface IProps {
  isDot?: boolean;
  isInfinie?: boolean;
  speed?: number;
  children: ReactNode[];
  slidesToScroll?: number;
  slidesToShow?: number;
}

const Sliders = ({
  isDot = true,
  isInfinie = true,
  speed = 500,
  slidesToScroll = 1,
  slidesToShow = 1,
  children,
}: IProps) => {
  const settings = {
    dots: isDot,
    infinite: isInfinie,
    speed,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow,
    slidesToScroll,
  };

  return (
    <Slider dotsClass="slick-dots !bottom-8" {...settings}>
      {children}
    </Slider>
  );
};

export default Sliders;
