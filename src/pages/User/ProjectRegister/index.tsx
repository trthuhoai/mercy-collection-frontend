import React, { useEffect, useState } from 'react';
import { getMyProjectsRegister } from 'apis/projects';
import Table from 'components/Table';
import { ECategoryProject } from 'constant/types';
import { IProjectDetail } from 'pages/Project/Detail/types';
import { headers } from './constant';
import Typo from 'components/Typo';
import Loading from 'components/Loading';

const ProjectRegister = () => {
  const [listProject, setListProject] = useState<IProjectDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getMyProjectsRegister();
        setListProject(data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
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

  return (
    <div className="my-10 container">
      <Typo size="max" isBold className="mb-10">
        Danh sách dự án tình nguyện đã đăng kí
      </Typo>
      {loading ? (
        <Loading />
      ) : listProject.length ? (
        <Table headers={headers} rows={rows} />
      ) : (
        <Typo>Không có dự án</Typo>
      )}
    </div>
  );
};

export default ProjectRegister;
