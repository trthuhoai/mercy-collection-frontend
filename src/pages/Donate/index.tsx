import Typo from 'components/Typo';
import React from 'react';

const Donate = () => {
  return (
    <div className="container my-10">
      <div className="mx-auto w-40 h-40">
        <img src="/logo.png" alt="Mã QR" className="w-full h-full" />
      </div>
      <Typo size="large" isBold align="center" className="my-8">
        Bạn có thể ủng hộ cho Mercy Collection bằng cách chuyển khoản hoặc quét
        mã QR dưới đây:
      </Typo>
      <Typo align="center">
        Số tài khoản: 123456789 <br />
        Ngân hàng: TMCP Quân đội, CN Tây Hà Nội <br />
        Chủ tài khoản: Công ty Cổ phần Mercy Collection
      </Typo>
      <div className="my-8 mx-auto w-52 h-52">
        <img src="/qr-bank.jpg" alt="Mã QR" className="w-full h-full" />
      </div>
      <Typo className="text-justify">
        Số tiền bạn ủng hộ được dùng để bù đắp cho các chi phí vận hành của
        Mercy Collection, nhằm xây dựng một nền tảng gây quỹ cộng đồng trực
        tuyến tiện lợi, tin cậy và minh bạch cho người dùng và hoàn toàn MIỄN
        PHÍ cho các tổ chức phi lợi nhuận, bao gồm:
        <br />
        Công nghệ: Máy chủ, băng thông, bảo trì, phát triển hệ thống,… là các
        hạng mục mà chúng tôi cần để đảm bảo tính ổn định, tiện lợi và bảo mật
        cho người dùng và các tổ chức gây quỹ.
        <br />
        Nhân lực: Nguồn ủng hộ của các bạn giúp Mercy Collection duy trì bộ máy
        nhân sự vận hành cần thiết, chúng tôi nỗ lực tối ưu bộ máy nhân sự thông
        qua việc sử dụng các nguồn lực tình nguyện viên và hỗ trợ khác để đảm
        bảo số tiền đóng góp của bạn có hiệu suất cao nhất.
        <br />
        Trân trọng!
      </Typo>
    </div>
  );
};

export default Donate;
