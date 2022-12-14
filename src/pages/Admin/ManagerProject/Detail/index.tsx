import React, { useEffect, useState } from 'react';
import {
  getProjectsDetail,
  activeProject,
  cancelRegisterProject,
} from 'apis/projects';
import { useParams } from 'react-router-dom';
import { IProjectDetail } from './types';
import Typo from 'components/Typo';
import Button from '@mui/material/Button';
import Loading from 'components/Loading';
import { ECategoryProject, EStatusProject } from 'constant/types';
import { toast } from 'react-toastify';
import ListItemText from '@mui/material/ListItemText';
import { useUser } from 'store';

const ProjectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState<IProjectDetail>();
  const [loading, setLoading] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const { isAuthenticated, setUser } = useUser();
  // const login = checkLogin();
  const onSubmit = async () => {
    try {
      if (id) {
        await activeProject(id);
        const data = await getProjectsDetail(id);
        setProjects(data);
        toast.success('Phê duyệt thành công');
      }
    } catch (error) {
      toast.error('Phê duyệt thất bại');
    }
  };

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          setLoading(true);

          const data = await getProjectsDetail(id);
          setProjects(data);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [id, isAuthenticated]);

  if (loading || !projects) return <Loading />;

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
         
                {projects.reasion && (<div className="flex justify-between mb-4 last:mb-0">
                  <Typo>Lý do huỷ:</Typo>
                  <Typo className="whitespace-pre-line">{projects.reasion}</Typo>
                </div>)}
              </div>
              {projects.status==='PENDING'?( <div className=' mt-6 text-center'>
                      <Button
                        size="large"
                        variant="contained"
                        onClick={onSubmit}
                      >
                        Phê duyệt
                      </Button>
                      </div>):(
                         <div className="mt-8 text-center">
                         <div className='font-mono text-1xl py-1 text-sky-600 bg-slate-300'> ĐÃ PHÊ DUYỆT</div>
                       </div>
                      )}
             

            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProjectDetail;