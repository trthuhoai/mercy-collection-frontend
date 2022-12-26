import React, { useEffect, useState } from 'react';
import {
  getProjectsDetail,
  activeProject,
  cancelRegisterProject,
  cancelProject,
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
import { generatePath, useNavigate } from 'react-router-dom';
import { routes } from 'constant/routes';
import Checkbox from '@mui/material/Checkbox';
import Modal from 'components/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { IFormResionProps } from 'components/Header/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCancel } from './constant';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<IProjectDetail>();
  const [loading, setLoading] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const { isAuthenticated, setUser } = useUser();
  const [reasion, setReasion] = useState(false);
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

  const getValue = e => {
    if (e.target.checked) {
      setReasion(true);
    } else {
      setReasion(false);
    }
    console.warn(reasion);
  };

  const onCancel = async data => {
    if (reasion) {
      console.log(data);
      try {
        const body = {
          ...data,
        };

        if (id) {
          await cancelProject(body, id);
          if (id) {
            const data = await getProjectsDetail(id);
            setProjects(data);
          }
          setOpenCancelModal(false);
          toast.success('Huỷ dự án thành công');
        }
      } catch (error) {
        toast.error('Huỷ dự án thất bại');
      }
    }
  };

  const {
    register: registerCancel,
    handleSubmit: handleSubmitCancel,
    reset: resetCancel,
    formState: { errors: errorsCancel },
  } = useForm<IFormResionProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaCancel),
  });

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
                  <Typo>Người tổ chức:</Typo>
                  <Typo
                    isBold
                    onClick={() =>
                      navigate(
                        generatePath(routes.USER, { id: projects.memberId }),
                      )
                    }
                  >
                    {projects.email}
                  </Typo>
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
              {projects.status === 'PENDING' ? (
                <div className=" mt-6 text-center">
                  <Button
                    color="error"
                    size="large"
                    variant="outlined"
                    sx={{
                      marginRight: '24px',
                    }}
                    onClick={() => setOpenCancelModal(true)}
                  >
                    Hủy dự án
                  </Button>
                  <Button size="large" variant="contained" onClick={onSubmit}>
                    Phê duyệt
                  </Button>
                </div>
              ) : projects.status === 'CANCELLED' ? (
                <div className="mt-8 text-center">
                  <div className="font-mono text-1xl py-1 text-sky-600 bg-slate-300">
                    {' '}
                    ĐÃ HUỶ
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-center">
                  <div className="font-mono text-1xl py-1 text-sky-600 bg-slate-300">
                    {' '}
                    ĐÃ PHÊ DUYỆT
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openCancelModal}
        title="Xác nhận huỷ dự án"
        onClose={() => setOpenCancelModal(false)}
      >
        Bạn có chắc chắn muốn huỷ hoạt động này không?
        {/* 
        <div className='my-4'><Checkbox color="secondary" value="1" onClick={(e) => getValue(e)} />Không đủ số lượng người đăng ký tham gia</div>
        <div className='my-4'><Checkbox color="secondary" value="2" onClick={(e) => getValue(e)} />Muốn dời thời gian tình nguyện </div>
        <div className='my-4'><Checkbox color="secondary" value="3" onClick={(e) => getValue(e)} />c</div>
        <div className='my-4'><Checkbox color="secondary" value="4" onClick={(e) => getValue(e)} />d</div> */}
        <Box
          component="form"
          onSubmit={handleSubmitCancel(onCancel)}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            fullWidth
            multiline
            label="Lý do huỷ hoạt động"
            type="text"
            {...registerCancel('reasion')}
            error={!!errorsCancel.reasion}
            helperText={errorsCancel.reasion?.message}
            sx={{
              marginTop: '24px',
            }}
          />
          <div className="my-4">
            <Checkbox color="secondary" value="1" onClick={e => getValue(e)} />{' '}
            Đồng ý gửi email thông báo huỷ đến người tổ chức dự án này.
          </div>
          {!reasion && (
            <div className="my-4 text-red-600 text-sm">
              Bạn cần đồng ý gửi email thông báo trước khi xác nhận huỷ
            </div>
          )}

          <div className="text-center mt-4">
            <Button
              sx={{
                marginRight: '48px',
              }}
              size="large"
              variant="outlined"
              onClick={() => setOpenCancelModal(false)}
            >
              Trở về
            </Button>
            <Button
              color="error"
              size="large"
              variant="contained"
              type="submit"
            >
              Huỷ dự án
            </Button>
            {/* <button className='bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:bg-red-600 rounded mt-6' onClick={onCancel}>
              Huỷ đăng ký
            </button> */}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectDetail;
