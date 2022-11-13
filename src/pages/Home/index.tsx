import React from 'react';
import Sliders from 'components/Slider';
import Typo from 'components/Typo';
import ProjectList from './ProjectList';
import VolunteerList from './VolunteerList';
import AmbassadorList from './AmbassadorList';
import Statistic from './Statistic';

const Home = () => {
  const imagesSlider = [
    <img src="/slider.png" alt="anh tu thien" className="h-[438px]" />,
    <img src="/slider1.jpg" alt="anh tu thien" className="h-[438px]" />,
    <img src="/slider.png" alt="anh tu thien" className="h-[438px]" />,
  ];

  return (
    <div className="w-full">
      <Sliders>{imagesSlider}</Sliders>
      <div className="my-20">
        <div className="container">
          <ProjectList />
          <VolunteerList />
          <AmbassadorList />
        </div>
        <Statistic />
        <div className="w-1/2 flex gap-8 mx-auto">
          <div className="flex-1">
            <img src="/slider.png" alt="logo" />
          </div>
          <div className="flex-1">
            <Typo className="mb-4 text-primary-500" size="larger" isBold>
              Mercy Collection là gì?
            </Typo>
            <Typo>
              Mercy Collection là nền tảng gây quỹ cộng đồng trực tuyến tiện
              lợi, tin cậy và minh bạch. <br /> Mercy Collection được tin dùng
              bởi các tổ chức cộng đồng uy tín như: Quỹ Bảo Trợ Trẻ Em Việt Nam,
              Operation Smile, Quỹ Vì Tầm Vóc Việt, Pan Nature, Mạng Lưới Ung
              Thư Vú Việt Nam, Trung tâm hợp tác phát triển Tây Bắc và nhiều tổ
              chức khác. <br />
              Mercy Collection được hỗ trợ công nghệ bởi FPT Smart Cloud,
              Comartek, Viettel Pay và VNPay, đảm bảo ứng dụng hoạt động ổn
              định, phương thức thanh toán đa dạng và an toàn.
            </Typo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
