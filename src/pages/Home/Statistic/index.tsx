import React from 'react';
import Typo from 'components/Typo';

const Statistic = () => {
  return (
    <div className="bg-primary-50 py-10 mb-16">
      <Typo isBold className="text-center text-5xl">
        Thống kê
      </Typo>
      <div className="flex justify-center gap-60 mt-14 text-center">
        <div>
          <Typo isBold>Dự án</Typo>
          <Typo className="mt-4 text-5xl" isBold>
            14
          </Typo>
        </div>
        <div>
          <Typo isBold>Sứ giả</Typo>
          <Typo className="mt-4 text-5xl" isBold>
            1000
          </Typo>
        </div>
        <div>
          <Typo isBold>Lượt ủng hộ</Typo>
          <Typo className="mt-4 text-5xl" isBold>
            1400
          </Typo>
        </div>
        <div>
          <Typo isBold>Tổng tiền</Typo>
          <Typo className="mt-4 text-5xl" isBold>
            1400M
          </Typo>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
