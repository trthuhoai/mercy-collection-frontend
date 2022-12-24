import React, { useEffect, useState } from 'react';
import { getMyProjectPeoples, sendMailProject } from 'apis/projects';
import { IFormMailProps, IProjectPeople } from 'pages/Me/Project/Detail/types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Typo from 'components/Typo';
import Table from 'components/Table';
import { headers, schemaSendMail } from './constant';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Loading from 'components/Loading';
import { FORMAT_DATE } from 'constant';
import { convertDate } from 'untils';
import Modal from 'components/Modal';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import SendMail from './send';

const People = () => {
  const { id } = useParams();
  const [openSendMailModal, setOpenSendMailModal] = useState(false);
  const [isSendMail, setIsSendMail] = useState<boolean>(false);
  const [listPeople, setListPeople] = useState<IProjectPeople[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMail = async () => {
    try {
      // await sendMailProject(id);
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
      setOpenSendMailModal(false);
    })();
  }, [id]);

  const onSubmitSendMail = async data => {
    try {
      // const dataLogin = await loginWithUser(data);
      // if (dataLogin.verify === false) {
      //   setVerify(
      //     'Trước khi đăng nhập, hãy xác minh tài khoản của bạn bằng cách click vào liên kết chúng tôi đã gửi qua email mà bạn đăng ký',
      //   );
      // } else {
      //   localStorage.setItem(ELocalStorageKey.ACCESS_TOKEN, dataLogin.token);
      //   const dataUser = await getInfoUser();
      //   setUser(dataUser);
      //   toast.success('Đăng nhập thành công');
      //   setOpenLoginModal(false);
      // }
    } catch (error: any) {
      toast.error('Đăng nhập thất bại');
    } finally {
      // setOpenLoginModal(false);
    }
  };

  const {
    register: registerSendMail,
    handleSubmit: handleSubmitSendMail,
    reset: resetLogin,
    formState: { errors: errorsSendMail },
  } = useForm<IFormMailProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaSendMail),
  });

  const rows = listPeople.map(({ name, email, tel, createdAt }) => ({
    name,
    email,
    tel,
    createdAt: convertDate(new Date(createdAt), FORMAT_DATE.FULL_DATE_HOUR),
  }));

  return (
    <>
      <div className="lg:my-10 container">
        <Typo size="max" isBold className="mb-10">
          {isSendMail
            ? 'Gửi mail thông báo'
            : 'Danh sách người đăng ký tham gia dự án tình nguyện'}
        </Typo>

        {/* <div className="mt-8 text-right mb-4 mr-28">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          color="secondary"
          onClick={() => handleSendMail()}
        >
          Gửi mail
        </Button>
      </div> */}
        <div className="">
          {loading ? (
            <Loading />
          ) : listPeople.length ? (
            <div>
              <div className="mt-8 text-right mb-4 mr-28">
                {isSendMail ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setIsSendMail(false)}
                  >
                    Trở về
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    color="secondary"
                    onClick={() => setIsSendMail(true)}
                  >
                    Gửi mail
                  </Button>
                )}
              </div>
              {isSendMail ? (
                <SendMail onSetIsSendMail={setIsSendMail} />
              ) : (
                <Table headers={headers} rows={rows} />
              )}
            </div>
          ) : (
            <div>
              <div className="mt-8 text-right mb-4 mr-28">
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  color="secondary"
                  disabled
                >
                  Gửi mail
                </Button>
              </div>
              <Typo>Không có người đăng ký tham gia</Typo>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={openSendMailModal}
        title="Đăng nhập"
        onClose={() => setOpenSendMailModal(false)}
      >
        <Box
          component="form"
          onSubmit={handleSubmitSendMail(onSubmitSendMail)}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            {...registerSendMail('title')}
            error={!!errorsSendMail.title}
            helperText={errorsSendMail.title?.message}
          />
          <div className="my-4" />
          <div className="text-center mb-8">
            <Button
              size="large"
              variant="outlined"
              sx={{
                marginRight: '24px',
              }}
              onClick={() => {
                setOpenSendMailModal(false);
              }}
            >
              Huỷ
            </Button>
            <Button size="large" variant="contained" type="submit">
              Đăng nhập
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default People;
