import React, { useEffect, useState } from 'react';
import { getMyProjects } from 'apis/projects';
import Table from 'components/Table';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { IProjectDetail } from 'pages/Project/Detail/types';
import { headers } from './constant';
import { ECategoryProject, EStatusProject } from 'constant/types';
import RemoveIcon from '@mui/icons-material/Remove';
import CreateProject from './create';
import Typo from 'components/Typo';
import Button from '@mui/material/Button';
import { generatePath, useNavigate } from 'react-router-dom';
import Loading from 'components/Loading';
import { routes } from 'constant/routes';

const className = {
  PENDING:'border-blue-500 text-blue-500',
  ACTIVE: 'border-green-500 text-green-500',
  CANCELLED: 'border-red-500 text-red-500',
  EXPIRED: 'border-yellow-500 text-yellow-500',
  ENDED: 'border-gray-500 text-gray-500',
};

const Project = () => {
  const [listProject, setListProject] = useState<IProjectDetail[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getMyProjects();
        setListProject(data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getListProjects = async () => {
    const data = await getMyProjects();
    setListProject(data.data);
  };

  const rows = listProject.map(
    ({
      id,
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
      status,
      location,
    }) => ({
      title,
      people,
      registered,
      category: ECategoryProject[category],
      // deadline: deadlineTime + ' ' + deadline,
      // startTime: startTime + ' ' + startAt,
      // endTime: endTime + ' ' + endAt,
      location,
      status: (
        <div
          className={'w-fit px-3 py-1 rounded-md border ' + className[status]}
        >
          {EStatusProject[status]}
        </div>
      ),
      action: (
        <Button
          variant="contained"
          onClick={e => {
            e.stopPropagation();
            navigate(generatePath(routes.ME.DETAIL_PROJECT, { id }));
          }}
        >
          Chi tiết
        </Button>
      ),
      onClick: () => navigate(generatePath(routes.ME.UPDATE_PROJECT, { id })),
    }),
  );

  return (
    <div className="md:my-10 container">
      <Typo size="max" isBold className="mb-10">
        {isCreate ? ' Tạo dự án tình nguyện' : 'Danh sách dự án tình nguyện'}
      </Typo>
      <div className="">
        {isCreate ? (
          <CreateProject
            onGetListProject={getListProjects}
            onSetIsCreate={setIsCreate}
          />
        ) : loading ? (
          <Loading />
        ) : listProject.length ? (
          <Table headers={headers} rows={rows} />
        ) : (
          <Typo>Không có dự án</Typo>
        )}
      </div>
      <div
        className="fixed bottom-8 right-8 md:bottom-20 md:right-20 lg:bottom-28 lg:right-28"
        onClick={() => setIsCreate(!isCreate)}
      >
        <Tooltip
          placement="top"
          title={isCreate ? 'Hiển thị danh sách' : 'Thêm dự án'}
        >
          <Fab color="primary" aria-label="add">
            {isCreate ? <RemoveIcon /> : <AddIcon />}
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

export default Project;
