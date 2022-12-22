import React, { useEffect, useState } from 'react';
import { getStatistic } from 'apis/statistic';
import Typo from 'components/Typo';
import { IProject } from './types';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FolderIcon from '@mui/icons-material/Folder';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { deepOrange, lightBlue, purple } from '@mui/material/colors';

const Statistic = () => {
  const [project, setProject] = useState<IProject>();

  useEffect(() => {
    (async () => {
      const data = await getStatistic();
      setProject(data);
    })();
  }, []);

  return (
    // <div className="bg-[#6fa85e5c] p-4 lg:p-10 mb-16 rounded-2xl">
    //   <Typo isBold className="text-center text-3xl lg:text-5xl font-mono">
    //     Những con số biết nói
    //   </Typo>
    //   <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 lg:gap-20 xl:gap-60 mt-14 text-center">
    //     <div>
    //       <Typo isBold>Dự án thiện nguyện</Typo>
    //       <Typo className="mt-4 text-3xl lg:text-5xl" isBold>
    //         {project?.numberProject}
    //       </Typo>
    //     </div>
    //     <div>
    //       <Typo isBold>Dự án thành công</Typo>
    //       <Typo className="mt-4 text-3xl lg:text-5xl" isBold>
    //         {project?.success}
    //       </Typo>
    //     </div>
    //     <div>
    //       <Typo isBold>Lượt đăng ký tình nguyện</Typo>
    //       <Typo className="mt-4 text-3xl lg:text-5xl" isBold>
    //         {project?.numberRegisterPeople}
    //       </Typo>
    //     </div>
    //     <div>
    //       <Typo isBold>Thành viên</Typo>
    //       <Typo className="mt-4 text-3xl lg:text-5xl" isBold>
    //         {project?.numberUser}
    //       </Typo>
    //     </div>
    //   </div>
    // </div>
    // <div className="my-10 container">
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-2 mb-36 mt-8 p-14">
      <div className="flex flex-1 justify-between items-center py-8 px-6 border border-gray-300 bg-white rounded-lg">
        <div className="text-gray-500">
          <Typo className="mb-2" size="large" isBold>
            Dự án thiện nguyện
          </Typo>
          <Typo size="max" isBold>
            {project?.numberProject}
          </Typo>
        </div>
        <Avatar
          sx={{
            bgcolor: purple[500],
          }}
        >
          <FolderCopyIcon />
        </Avatar>
      </div>
      <div className="flex flex-1 justify-between items-center py-2 px-6 border border-gray-300 bg-white rounded-lg">
        <div className="text-gray-500">
          <Typo className="mb-2" size="large" isBold>
            Dự án thành công
          </Typo>
          <Typo size="max" isBold>
            {project?.success}
          </Typo>
        </div>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
          }}
        >
          <FolderIcon />
        </Avatar>
      </div>
      <div className="flex flex-1 justify-between items-center py-2 px-6 border border-gray-300 bg-white rounded-lg">
        <div className="text-gray-500">
          <Typo className="mb-2" size="large" isBold>
            Lượt đăng ký tình nguyện
          </Typo>
          <Typo size="max" isBold>
            {project?.numberRegisterPeople}
          </Typo>
        </div>
        <Avatar
          sx={{
            bgcolor: lightBlue[500],
          }}
        >
          <AppRegistrationIcon />
        </Avatar>
      </div>
      <div className="flex flex-1 justify-between items-center py-2 px-6 border border-gray-300 bg-white rounded-lg">
        <div className="text-gray-500">
          <Typo className="mb-2" size="large" isBold>
            Thành viên
          </Typo>
          <Typo size="max" isBold>
            {project?.numberUser}
          </Typo>
        </div>
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
          }}
        >
          <PeopleAltIcon />
        </Avatar>
      </div>
    </div>
    // </div>
  );
};

export default Statistic;
