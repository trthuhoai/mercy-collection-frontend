import Typo from 'components/Typo';
import React from 'react';

const About = () => {
  return (
    <div className="container my-10 text-center">
      <div className="mx-auto w-40 h-40 mb-8">
        <img src="/logo.png" alt="Mã QR" className="w-full h-full" />
      </div>
      <div className="mx-auto w-1/2">
        <Typo>
          Mercy Collection.vn là nền tảng gây quỹ cộng đồng trực tuyến tiện lợi,
          tin cậy và minh bạch. Được phát triển và vận hành bởi Doanh nghiệp xã
          hội Mercy Collection.
        </Typo>
        <Typo className="my-4">
          Mercy Collection được tin dùng bởi các tổ chức cộng đồng uy tín, như:
          Quỹ Bảo Trợ Trẻ Em Việt Nam, Quỹ từ thiện Bông Sen, Quỹ xã hội Phan
          Anh, Operation Smile Vietnam, Quỹ Vì Tầm Vóc Việt, Pan Nature, Mạng
          Lưới Ung Thư Vú Việt Nam, Trung tâm hợp tác phát triển Tây Bắc, và
          nhiều tổ chức khác.
        </Typo>
        <Typo>
          Mercy Collection được hỗ trợ công nghệ bởi Comartek, FPT Smart Cloud,
          Viettel Money và VNPay, đảm bảo ứng dụng hoạt động ổn định và phương
          thức thanh toán đa dạng, an toàn.
        </Typo>
      </div>
    </div>
  );
};

export default About;
