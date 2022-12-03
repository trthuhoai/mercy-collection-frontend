import React, { useEffect, useState } from 'react';
import {
  getProjectsDetail,
  registerProject,
  cancelRegisterProject,
} from 'apis/projects';
import { useParams } from 'react-router-dom';
import { IProjectDetail } from './types';
import Typo from 'components/Typo';
import Button from '@mui/material/Button';
import Loading from 'components/Loading';
import { ECategoryProject } from 'constant/types';
import { toast } from 'react-toastify';
import Comment from './Comment';
import ListItemText from '@mui/material/ListItemText';
import { useUser } from 'store';
import Modal from 'components/Modal';

const ProjectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState<IProjectDetail | null>(null);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const { isAuthenticated, setUser } = useUser();
  // const login = checkLogin();
  const onSubmit = async () => {
    try {
      if (id) {
        await registerProject(id);
        const data = await getProjectsDetail(id);
        setProjects(data);
        toast.success('Đăng kí tham gia thành công');
      }
    } catch (error) {
      toast.error('Huỷ đăng kí tham gia thất bại vì bạn chưa đăng ký');
    }
  };
  const onCancel = async () => {
    try {
      if (id) {
        await cancelRegisterProject(id);
        const data = await getProjectsDetail(id);
        setProjects(data);
        setOpenRegisterModal(false);
        toast.success('Huỷ đăng kí tham gia thành công');
      }
    } catch (error) {
      toast.error('Đăng kí tham gia thất bại vì bạn đã đăng ký');
    }
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getProjectsDetail(id);
        setProjects(data);
      }
    })();
  }, [id]);

  if (!projects) return <Loading />;

  return (
    <>
      <div className="container my-10">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <div className="flex-1">
            <img
              src={projects.pictureUrl}
              alt="Ảnh từ thiện"
              className="mx-auto max-h-[576px] rounded-md"
            />
            <div className="mt-10">
              <Typo size="large" isBold>
                Nội dung:
              </Typo>
              <ListItemText
                sx={{
                  whiteSpace: 'pre-line',
                }}
                secondary={
                  <>
                    <Typo className="mt-2 text-justify ">
                      {projects.content}
                    </Typo>
                  </>
                }
              />
            </div>
            <Comment />
          </div>
          <div className="lg:sticky top-16 lg:w-1/3 h-fit">
            <div className="bg-white rounded-md p-4 sm:py-8 sm:px-10">
              <div className="bg-primary-500 rounded-md text-white px-4 py-2 mb-4 ml-auto w-fit">
                {ECategoryProject[projects.category]}
              </div>
              <Typo size="larger" isBold>
                {projects.title}
              </Typo>
              <div className="mt-4">
                <div className="flex flex-wrap items-center justify-between mb-4 last:mb-0">
                  <Typo>Mục tiêu dự án:</Typo>
                  <Typo>{projects.people.toLocaleString()} người</Typo>
                </div>
                <div className="relative w-full h-2 my-4">
                  <div className="absolute bg-primary-200 inset-0 rounded-md" />
                  <div
                    style={{
                      width: `${Math.floor(
                        (projects.registered / projects.people) * 100,
                      )}%`,
                    }}
                    className="absolute bg-primary-500 inset-0 rounded-md"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between mb-4 last:mb-0">
                  <Typo>Đã đạt được:</Typo>
                  <Typo>{projects.registered.toLocaleString()} người</Typo>
                </div>
                <div className="flex flex-wrap items-center justify-between mb-4 last:mb-0">
                  <Typo>Tỉ lệ đạt được:</Typo>
                  <Typo>
                    {' '}
                    {Math.floor((projects.registered / projects.people) * 100)}%
                  </Typo>
                </div>
                <div className="flex flex-wrap items-center justify-between mb-4 last:mb-0">
                  <Typo>Email người tổ chức:</Typo>
                  <Typo>{projects.email}</Typo>
                </div>
                <div className="flex flex-wrap items-center justify-between mb-4 last:mb-0">
                  <Typo>Thời gian bắt đầu:</Typo>
                  <Typo>
                    {projects.startAt} {projects.startTime}
                  </Typo>
                </div>
                <div className="flex flex-wrap items-center justify-between mb-4 last:mb-0">
                  <Typo>Thời gian kết thúc:</Typo>
                  <Typo>
                    {projects.endAt} {projects.endTime}
                  </Typo>
                </div>
                <div className="flex flex-wrap items-center justify-between mb-4 last:mb-0">
                  <Typo>Thời hạn đăng ký:</Typo>
                  <Typo>
                    {projects.deadline} {projects.deadlineTime}
                  </Typo>
                </div>
                <div className="flex flex-wrap items-center justify-between mb-4 last:mb-0">
                  <Typo>Địa điểm:</Typo>
                  <Typo>{projects.location}</Typo>
                </div>
              </div>
              {projects.status === 'ACTIVE' && (
                <div className="mt-8 text-center">
                  {isAuthenticated ? (
                    projects.registerStatus ? (
                      <div>
                        <div className="font-serif text-1xl py-1 text-sky-600 bg-slate-300">
                          {' '}
                          BẠN ĐÃ ĐĂNG KÝ THAM GIA HOẠT ĐỘNG NÀY
                        </div>
                        <button
                          className="bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:bg-red-600 rounded mt-6"
                          onClick={() => setOpenRegisterModal(true)}
                        >
                          Huỷ đăng ký
                        </button>
                      </div>
                    ) : (
                      <Button
                        size="large"
                        variant="contained"
                        onClick={onSubmit}
                      >
                        Tham gia ngay
                      </Button>
                    )
                  ) : (
                    <div className="font-serif text-2xl text-sky-600 bg-slate-300">
                      {' '}
                      Hãy đăng nhập để đăng ký tham gia hoạt động này
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openRegisterModal}
        title="Xác nhận huỷ đăng ký"
        onClose={() => setOpenRegisterModal(false)}
      >
        Bạn có chắc chắn muốn huỷ đăng ký tham gia hoạt động này không?
        <div className="text-center mt-4">
          <Button
            sx={{
              marginRight: '48px',
            }}
            size="large"
            variant="outlined"
            onClick={() => setOpenRegisterModal(false)}
          >
            Hủy
          </Button>
          <Button
            color="error"
            size="large"
            variant="contained"
            type="submit"
            onClick={onCancel}
          >
            Huỷ đăng ký
          </Button>
          {/* <button className='bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:bg-red-600 rounded mt-6' onClick={onCancel}>
            Huỷ đăng ký
          </button> */}
        </div>
      </Modal>
    </>
  );
};

export default ProjectDetail;
