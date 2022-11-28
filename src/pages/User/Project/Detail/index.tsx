import React, { useEffect, useState } from 'react';
import { getMyProjectPeoples, sendMailProject } from 'apis/projects';
import { IProjectPeople } from 'pages/User/Project/Detail/types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Typo from 'components/Typo';
import Table from 'components/Table';
import { headers } from './constant';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Loading from 'components/Loading';
import { FORMAT_DATE } from 'constant';
import { convertDate } from 'untils';

const People = () => {
  const { id } = useParams();
  const [listPeople, setListPeople] = useState<IProjectPeople[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMail = async () => {
    try {
      await sendMailProject(id);
      toast.success('Gửi mail cho thành viên đã đăng ký thành công');
    } catch (error) {
      toast.error('Gửi mail cho thành viên đã đăng ký thất bại');
    }
  };

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await getMyProjectPeoples(id);
          setListPeople(data.peopleList);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [id]);

  const rows = listPeople.map(({ name, email, tel, createdAt }) => ({
    name,
    email,
    tel,
    createdAt: convertDate(new Date(createdAt), FORMAT_DATE.FULL_DATE_HOUR),
  }));

  return (
    <div className="my-10 container">
      <Typo size="max" isBold className="mb-10">
        Danh sách người đăng ký tham gia dự án tình nguyện
      </Typo>
      <div className="mt-8 text-right mb-4 mr-28">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          color="secondary"
          onClick={() => handleSendMail()}
        >
          Gửi mail
        </Button>
      </div>
      <div className="">
        {loading ? (
          <Loading />
        ) : listPeople.length ? (
          <Table headers={headers} rows={rows} />
        ) : (
          <Typo>Không có dự án</Typo>
        )}
      </div>
    </div>
  );
};

export default People;
