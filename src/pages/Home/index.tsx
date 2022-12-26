import React from 'react';
import Sliders from 'components/Slider';
import Typo from 'components/Typo';
import ProjectList from './ProjectList';
import CampaignList from './CampaignList';
import AmbassadorList from './AmbassadorList';
import Statistic from './Statistic';

const Home = () => {
  const imagesSlider = [
    <img
      src="/tree.png"
      alt="anh tu thien"
      className="h-[238px] md:h-[438px]"
    />,
    <img
      src="/tn7.jpg"
      alt="anh tu thien"
      className="h-[238px] md:h-[438px]"
    />,
    // <img src="tn4.png" alt="anh tu thien" className="h-[238px] md:h-[438px]" />,
    <img
      src="/tn5.jpg"
      alt="anh tu thien"
      className="h-[238px] md:h-[438px]"
    />,
    <img
      src="/tn6.jpg"
      alt="anh tu thien"
      className="h-[238px] md:h-[438px]"
    />,
    // <img
    //   src="/lantoayeuthuong.png"
    //   alt="anh tu thien"
    //   className="h-[238px] md:h-[438px]"
    // />,
  ];

  return (
    <div className="w-full">
      <Sliders autoplay responsive={false}>
        {imagesSlider}
      </Sliders>
      <div className="my-20">
        <div className="container">
          <ProjectList />
          {/* <CampaignList /> */}
          <AmbassadorList />
        </div>
        <Statistic />
        <div className="px-6 lg:w-1/2 sm:flex gap-8 mx-auto">
          <div className="flex-1 mb-6 sm:mb-0">
            <img src="/content.png" alt="logo" />
          </div>
          <div className="flex-1">
            <Typo className="mb-2 mt-14 text-primary-600" size="larger" isBold>
              Mercy Collection là gì?
            </Typo>
            <Typo className="text-justify">
              Mercy Collection là nền tảng tổ chức quản lý các hoạt động thiện
              nguyện, nền tảng gây quỹ cộng đồng trực tuyến tiện lợi, tin cậy và
              minh bạch. <br /> Mercy Collection được tin dùng bởi các tổ chức
              cộng đồng uy tín như: Quỹ Bảo Trợ Trẻ Em Việt Nam, Operation Smile
              DaNang, Quỹ Vì Tầm Vóc Việt, Pan Nature, Mạng Lưới Tình Nguyện
              xanh Việt Nam, Trung tâm hợp tác phát triển Trung Bộ và nhiều tổ
              chức khác. <br />
            </Typo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
