import React, { useState } from 'react';
import Typo from 'components/Typo';
import { useUser } from 'store';
import Modal from 'components/Modal';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { getBase64 } from 'untils';
import { updateUser } from 'apis/users';
import { ETabsInfo } from './types';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UpdateInfo from './UpdateInfo';
import Statistic from './Statistic';
import UpdatePassword from './UpdatePassword';

const Info = () => {
  const { user, getUser } = useUser();
  const [valueTabs, setValueTabs] = useState(ETabsInfo.STATISTIC);

  const [editImage, setEditImage] = useState<{
    open: boolean;
    mode?: 'avatar' | 'cover';
  }>({
    open: false,
  });

  const handleChange = (_, newValue) => {
    setValueTabs(newValue);
  };

  const [image, setImage] = useState<FileList | null>(null);

  const handleCloseModal = () => {
    setEditImage({
      open: false,
    });
    setImage(null);
  };

  const handleSubmitImage = async () => {
    try {
      if (image) {
        const data = {
          pictureFile:
            editImage.mode === 'avatar' ? await getBase64(image[0]) : undefined,
          coverFile:
            editImage.mode === 'cover' ? await getBase64(image[0]) : undefined,
        };
        await updateUser(data);
        toast.success(
          editImage.mode === 'avatar'
            ? 'Cập nhật ảnh đại diện thành công'
            : 'Cập nhật ảnh bìa thành công',
        );
        await getUser();
        setEditImage({
          open: false,
        });
        setImage(null);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="md:my-6">
        <div className="relative h-52 bg-gradient-to-r from-violet-100 via-purple-100 to-pink-100 rounded-tl-[90px]">
          {user?.cover && (
            <img
              src={user?.cover}
              alt="Ảnh bìa"
              className="w-full h-full  rounded-tl-[90px]"
            />
          )}
          <div
            className="absolute bottom-4 right-4 cursor-pointer"
            onClick={() =>
              setEditImage({
                open: true,
                mode: 'cover',
              })
            }
          >
            <CameraAltIcon />
          </div>
        </div>
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-6 -translate-y-1/2 ">
            <div className="relative w-36 h-36">
              <img
                src={user?.picture || '/avartar.png'}
                alt="Anh dai dien"
                className="rounded-full w-full h-full"
              />
              <div
                className="absolute bottom-0 right-0 cursor-pointer"
                onClick={() =>
                  setEditImage({
                    open: true,
                    mode: 'avatar',
                  })
                }
              >
                <CameraAltIcon />
              </div>
            </div>
            <div className="sm:self-end">
              <Typo className="mb-2" size="larger" isBold>
                {user?.name}
              </Typo>
              <Typo>{user?.email}</Typo>
            </div>
          </div>
          <Box sx={{ width: '100%' }}>
            <TabContext value={valueTabs}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} variant="fullWidth">
                  <Tab label="Thống kê" value={ETabsInfo.STATISTIC} />
                  <Tab
                    label="Thay đổi thông tin"
                    value={ETabsInfo.CHANGE_INFO}
                  />
                  <Tab label="Đổi mật khẩu" value={ETabsInfo.CHANGE_PASSWORD} />
                </TabList>
              </Box>
              <TabPanel value={ETabsInfo.STATISTIC}>
                <Statistic />
              </TabPanel>
              <TabPanel value={ETabsInfo.CHANGE_INFO}>
                <UpdateInfo />
              </TabPanel>
              <TabPanel value={ETabsInfo.CHANGE_PASSWORD}>
                <UpdatePassword />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
      <Modal
        isOpen={editImage.open}
        onClose={handleCloseModal}
        title={editImage.mode === 'avatar' ? 'Đổi ảnh đại diện' : 'Đổi ảnh bìa'}
      >
        <div className="text-center mb-6">
          <Button variant="contained" component="label">
            Tải ảnh lên
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={e => {
                setImage(e?.target?.files);
              }}
            />
          </Button>
          {image && (
            <div className="w-64 h-64 mt-6 mx-auto">
              <img
                src={URL.createObjectURL(image[0])}
                alt=""
                className="w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="text-center">
          <Button
            size="large"
            variant="outlined"
            sx={{
              marginRight: '24px',
            }}
            onClick={handleCloseModal}
          >
            Hủy
          </Button>
          <Button
            disabled={!image}
            size="large"
            variant="contained"
            onClick={handleSubmitImage}
          >
            Lưu
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Info;
