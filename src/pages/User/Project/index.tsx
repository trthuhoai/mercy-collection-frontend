import React, { useEffect, useState } from 'react';
import { getMyProjects, sendMailProject } from 'apis/projects';
import Table from 'components/Table';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { IProjectDetail } from 'pages/Project/Detail/types';
import { headers } from './constant';
import { ECategoryProject } from 'constant/types';
import RemoveIcon from '@mui/icons-material/Remove';
import CreateProject from './create';
import Typo from 'components/Typo';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';

const Project = () => {
  const [listProject, setListProject] = useState<IProjectDetail[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await getMyProjects();
      setListProject(data.data);
    })();
  }, []);

  const getListProjects = async () => {
    const data = await getMyProjects();
    setListProject(data.data);
  };

  const handleSendMail = async id => {
    try {
      await sendMailProject(id);
      toast.success('Gửi mail cho dự án thành công');
    } catch (error) {
      toast.success('Gửi mail cho dự án thất bại');
    }
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
      action: (
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => handleSendMail(id)}
        >
          Gửi mail
        </Button>
      ),
    }),
  );

  return (
    <div className="my-10 container">
      <Typo size="max" isBold className="mb-10">
        {isCreate ? ' Tạo dự án tình nguyện' : 'Danh sách dự án tình nguyện'}
      </Typo>
      <div className="">
        {isCreate ? (
          <CreateProject
            onGetListProject={getListProjects}
            onSetIsCreate={setIsCreate}
          />
        ) : !!listProject.length ? (
          <Table headers={headers} rows={rows} />
        ) : (
          <Typo>Không có dự án</Typo>
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
