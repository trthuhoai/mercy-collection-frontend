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
const People = () => {
    const { id } = useParams();
    const [listPeople, setListPeople] = useState<IProjectPeople[]>([]);
    const handleSendMail = async () => {
        try {
          await sendMailProject(id);
          toast.success('Gửi mail cho thành viên đã đăng ký thành công');
        } catch (error) {
          toast.success('Gửi mail cho thành viên đã đăng ký thất bại');
        }
      };
    //   useEffect(() => {
    //     (async () => {
    //       const data = await getMyProjectPeoples();
    //       setListPeople(data.data);
    //     })();
    //   }, []);
    useEffect(() => {
        (async () => {
          if (id) {
            const data = await getMyProjectPeoples(id);
            setListPeople(data.peopleList);
          }
        })();
      }, [id]);
    
      const getListProjects = async () => {
        if (id) {
            const data = await getMyProjectPeoples(id);
            setListPeople(data.peopleList);
          }
      };
      const rows = listPeople.map(
        ({
          name,
          email,
          tel,
          createdAt,
          picture
        }) => ({
          name,
          email,
          tel,
          createdAt,
        //   picture,
        //   action: (
        //     <Button
        //       variant="contained"
        //       endIcon={<SendIcon />}
        //       onClick={() => navigate('/me/projects/people')}
        //     >
        //       Chi tiết
        //     </Button>
        //     // <NavLink to='/signout' className='k-button k-flat'>Sign out</NavLink>
        //   ),
        }),
      );
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
         {!listPeople.length ? (
          <Table headers={headers} />
       
        ) : (
          <Table headers={headers} rows={rows} />
          // <Typo>Không có dự án</Typo>
        )}
      </div>
    </div>
    );
};

export default People;