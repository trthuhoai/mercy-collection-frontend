import React, { useEffect, useState } from 'react';
import Typo from 'components/Typo';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Stack from '@mui/material/Stack';
import { getStatistic } from 'apis/users';
import { IStatisticState } from './types';
import { deepOrange, lightBlue } from '@mui/material/colors';
import Loading from 'components/Loading';

const Statistic = () => {
  const [statistic, setStatistic] = useState<IStatisticState>();

  useEffect(() => {
    (async () => {
      const data = await getStatistic();
      setStatistic(data);
    })();
  }, []);

  if (!statistic) return <Loading />;
  return (
    <div className="my-10 container">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-2">
        <div className="flex flex-1 justify-between items-center py-2 px-6 border border-gray-300 bg-white rounded-lg">
          <div className="text-gray-500">
            <Typo className="mb-2" size="large" isBold>
              Dự án đã tạo
            </Typo>
            <Typo size="max" isBold>
              {statistic.numberProjects}
            </Typo>
          </div>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
            }}
          >
            <AssignmentIcon />
          </Avatar>
        </div>
        <div className="flex flex-1 justify-between items-center py-2 px-6 border border-gray-300 bg-white rounded-lg">
          <div className="text-gray-500">
            <Typo className="mb-2" size="large" isBold>
              Dự án đã tham gia
            </Typo>
            <Typo size="max" isBold>
              {statistic.numberRegistered}
            </Typo>
          </div>
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
            }}
          >
            <AssignmentIcon />
          </Avatar>
        </div>
        <div className="flex flex-1 justify-between items-center py-2 px-6 border border-gray-300 bg-white rounded-lg">
          <div className="text-gray-500">
            <Typo className="mb-2" size="large" isBold>
              Dự án đã tổ chức thành công
            </Typo>
            <Typo size="max" isBold>
              {statistic.successProject}
            </Typo>
          </div>
          <Avatar
            sx={{
              bgcolor: lightBlue[500],
            }}
          >
            <AssignmentIcon />
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
