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
  responsive?: boolean;
  autoplay?: boolean;
}

const Sliders = ({
  isDot = true,
  isInfinie = true,
  speed = 500,
  slidesToScroll = 1,
  slidesToShow = 1,
  responsive = true,
  autoplay = true,
  children,
}: IProps) => {
  const settings = {
    dots: isDot,
    infinite: isInfinie,
    speed,
    autoplay,
    autoplaySpeed: 4000,
    slidesToShow,
    slidesToScroll,
    responsive: responsive
      ? [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]
      : undefined,
  };

  return (
    <Slider dotsClass="slick-dots !bottom-8" {...settings}>
      {children}
    </Slider>
  );
};

export default Sliders;
