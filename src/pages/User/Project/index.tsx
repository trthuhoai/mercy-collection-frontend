import React, { useEffect, useState } from 'react';
import { getMyProjects } from 'apis/projects';
import Table from 'components/Table';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { IProjectDetail } from 'pages/Project/Detail/types';
import Loading from 'components/Loading';
import { headers } from './constant';
import { ECategoryProject } from 'constant/types';
import RemoveIcon from '@mui/icons-material/Remove';

const Project = () => {
  const [listProject, setListProject] = useState<IProjectDetail[] | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await getMyProjects();
      setListProject(data);
    })();
  }, []);

  const rows = listProject?.map(
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

  if (!listProject) return <Loading />;

  return (
    <div className="my-10 container">
      <div className="">
        {isCreate ? (
          <div>Tạo dự án</div>
        ) : (
          <Table headers={headers} rows={rows} />
        )}
      </div>
      <div
        className="fixed bottom-28 right-28"
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
