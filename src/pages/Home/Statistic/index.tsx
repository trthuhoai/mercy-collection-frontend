import React, { useEffect, useState } from 'react';
import { getStatistic } from 'apis/statistic';
import Typo from 'components/Typo';
import { IProject } from './types';

const Statistic = () => {
  const [project, setProject] = useState<IProject>();

  useEffect(() => {
    (async () => {
      const data = await getStatistic();
      setProject(data);
    })();
  }, []);

  return (
    <div className="bg-[#6fa85e5c] p-4 lg:p-10 mb-16 rounded-2xl font-serif">
      <Typo isBold className="text-center text-3xl lg:text-5xl font-mono ">
        Thống kê
      </Typo>
      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 lg:gap-20 xl:gap-60 mt-14 text-center">
        <div>
          <Typo isBold>Dự án thiện nguyện</Typo>
          <Typo className="mt-4 text-3xl lg:text-5xl" isBold>
            {project?.numberProject}
          </Typo>
        </div>
        <div>
          <Typo isBold>Dự án gây quỹ</Typo>
          <Typo className="mt-4 text-3xl lg:text-5xl" isBold>
            {project?.numberCampaign}
          </Typo>
        </div>
        <div>
          <Typo isBold>Lượt đăng ký tình nguyện</Typo>
          <Typo className="mt-4 text-3xl lg:text-5xl" isBold>
            {project?.numberRegisterPeople}
          </Typo>
        </div>
        <div>
          <Typo isBold>Thành viên</Typo>
          <Typo className="mt-4 text-3xl lg:text-5xl" isBold>
            {project?.numberUser}
          </Typo>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
