import React, { useEffect, useState } from 'react';
import { getMyProjectsRegister } from 'apis/projects';
import Table from 'components/Table';
import { ECategoryProject, EStatusProject } from 'constant/types';
import { IProjectDetail } from 'pages/Project/Detail/types';
import { headers } from './constant';
import Typo from 'components/Typo';
import Loading from 'components/Loading';
import { generatePath, useNavigate } from 'react-router-dom';
import { routes } from 'constant/routes';

const ProjectRegister = () => {
  const [listProject, setListProject] = useState<IProjectDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
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
    ({ projectId,
      title,
      category,
      deadlineTime,
      deadline,
      endAt,
      endTime,
      startAt,
      startTime,
      location,
      status
    }) => ({

      title,
      category: ECategoryProject[category],
      deadline: deadlineTime + ' ' + deadline,
      endTime: endTime + ' ' + endAt,
      startTime: startTime + ' ' + startAt,
      location,
      status: EStatusProject[status],
      onClick: () =>
        navigate(generatePath(routes.PROJECTS_DETAIL, { id: projectId }))

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
