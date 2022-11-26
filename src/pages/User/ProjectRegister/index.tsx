import React, { useEffect, useState } from 'react';
import { getMyProjectsRegister } from 'apis/projects';
import Table from 'components/Table';
import Loading from 'components/Loading';
import { ECategoryProject } from 'constant/types';
import { IProjectDetail } from 'pages/Project/Detail/types';
import { headers } from './constant';
import Typo from 'components/Typo';

const ProjectRegister = () => {
  const [listProject, setListProject] = useState<IProjectDetail[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getMyProjectsRegister();
      setListProject(data.data);
    })();
  }, []);

  const rows = listProject.map(
    ({
      title,
      people,
      registered,
      category,
      deadlineTime,
      deadline,
      endAt,
      endTime,
      startAt,
      startTime,
      location,
    }) => ({
      title,
      people,
      registered,
      category: ECategoryProject[category],
      deadline: deadlineTime + ' ' + deadline,
      endTime: endTime + ' ' + endAt,
      startTime: startTime + ' ' + startAt,
      location,
    }),
  );

  if (!listProject.length) return <Loading />;

  return (
    <div className="my-10 container">
      <Typo size="max" isBold className="mb-10">
        Danh sách dự án tình nguyện đã đăng kí
      </Typo>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default ProjectRegister;
