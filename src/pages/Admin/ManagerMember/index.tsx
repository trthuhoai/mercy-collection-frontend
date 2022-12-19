import React, { useEffect, useMemo, useState } from 'react';
import { getMembers, disableUser, enableUser } from 'apis/admin';
import Table from 'components/Table';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { IMemberDetail } from './types';
import { headers } from './constant';
import { ERoles } from 'constant/types';
import RemoveIcon from '@mui/icons-material/Remove';
import Typo from 'components/Typo';
import Button from '@mui/material/Button';
import { generatePath, useNavigate } from 'react-router-dom';
import Loading from 'components/Loading';
import { routes } from 'constant/routes';
import Modal from 'components/Modal';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import useDebounce from 'hooks/useDebounce';

const className = {
  USER: 'border-green-500 text-green-500',
  ADMIN: 'border-red-500 text-red-500',
};

const ManagerMember = () => {
  const [listMember, setListMember] = useState<IMemberDetail[]>([]);
  const [openDisableModal, setOpenDisableModal] = useState(false);
  const [openEnableModal, setOpenEnableModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<string>('');
  const [search, setSearch] = useState('');
  const valueSearch = useDebounce<string>(search);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getMembers(valueSearch);
        setListMember(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [valueSearch]);

  const getListMembers = async () => {
    const data = await getMembers();
    setListMember(data);
  };

  const onDisable = async id => {
    try {
      if (id) {
        await disableUser(id);
        const data = await getMembers();
        setListMember(data);
        toast.success('Khóa người dùng thành công');
      }
    } catch (error) {
      toast.error('Thất bại');
    } finally {
      setOpenDisableModal(false);
    }
  };

  const onEnable = async id => {
    try {
      if (id) {
        await enableUser(id);
        const data = await getMembers();
        setListMember(data);
        setOpenEnableModal(false);
        toast.success('Mở khóa người dùng thành công');
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
    }
  };
  const rows = listMember.map(
    ({
      id,
      name,
      picture,
      email,
      successProject,
      registeredProject,
      permission,
      disableUser,
    }) => ({
      picture: (
        <div>
          <Avatar>
            <img src={picture || '/avartar.png'} alt="Ảnh đại diện" />
          </Avatar>
        </div>
      ),
      name,
      email,
      successProject,
      registeredProject,
      permission: (
        <div
          className={
            'w-fit px-3 py-1 rounded-md border ' + className[permission]
          }
        >
          {ERoles[permission]}
        </div>
      ),
      action: (
        <div>
          {disableUser ? (
            <Button
              variant="contained"
              onClick={e => {
                e.stopPropagation();
                setPosition(id);
                setOpenEnableModal(true);
              }}
            >
              Mở khoá
            </Button>
          ) : (
            <Button
              color="error"
              variant="contained"
              onClick={e => {
                e.stopPropagation();
                setPosition(id);
                setOpenDisableModal(true);
              }}
            >
              Khoá
            </Button>
          )}
        </div>
      ),
    }),
  );

  return (
    <>
      <div className="md:my-10 container">
        <div className="flex items-center justify-between mb-10">
          <Typo size="max" isBold>
            Danh sách thành viên
          </Typo>
          <div className="w-1/3 bg-white shadow-lg text-gray-700 top-full right-0 py-2 px-6 rounded-3xl">
            <input
              className="outline-none"
              placeholder="Tìm kiếm...."
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          {loading ? (
            <Loading />
          ) : listMember.length ? (
            <Table headers={headers} rows={rows} />
          ) : (
            <Typo>Không có thành viên</Typo>
          )}
        </div>
      </div>
      <Modal
        isOpen={openDisableModal}
        title="Xác nhận vô hiệu hoá"
        onClose={() => setOpenDisableModal(false)}
      >
        Bạn có chắc chắn muốn vô hiệu hoá tài khoản này không?
        <div className="text-center mt-4">
          <Button
            sx={{
              marginRight: '48px',
            }}
            size="large"
            variant="outlined"
            onClick={() => setOpenDisableModal(false)}
          >
            Hủy
          </Button>
          <Button
            color="error"
            size="large"
            variant="contained"
            type="submit"
            onClick={() => onDisable(position)}
          >
            Xác nhận
          </Button>
          {/* <button className='bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:bg-red-600 rounded mt-6' onClick={onCancel}>
        Huỷ đăng ký
      </button> */}
        </div>
      </Modal>
      <Modal
        isOpen={openEnableModal}
        title="Xác nhận mở lại tài khoản"
        onClose={() => setOpenEnableModal(false)}
      >
        Bạn có chắc chắn muốn bỏ vô hiệu hoá tài khoản này không?
        <div className="text-center mt-4">
          <Button
            sx={{
              marginRight: '48px',
            }}
            size="large"
            variant="outlined"
            onClick={() => setOpenEnableModal(false)}
          >
            Hủy
          </Button>
          <Button
            color="error"
            size="large"
            variant="contained"
            type="submit"
            onClick={() => onEnable(position)}
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ManagerMember;
