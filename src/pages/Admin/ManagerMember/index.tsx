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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegister } from './constant';
import { IFormRegisterProps } from 'components/Header/types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { createAdmin } from 'apis/users';

const className = {
  USER: 'border-green-500 text-green-500',
  ADMIN: 'border-red-500 text-red-500',
};

const ManagerMember = () => {
  const [listMember, setListMember] = useState<IMemberDetail[]>([]);
  const [openDisableModal, setOpenDisableModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openEnableModal, setOpenEnableModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<string>('');
  const [search, setSearch] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
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
        const data = await getMembers('');
        setListMember(data);
        toast.success('Khóa người dùng thành công');
      }
    } catch (error) {
      toast.error('Thất bại');
    } finally {
      setOpenDisableModal(false);
    }
  };

  const onSubmit = async data => {
    try {
      await createAdmin(data);
      toast.success('Thêm admin thành công');
      setOpenRegisterModal(false);
      const dataMembers = await getMembers('');
      setListMember(dataMembers);
    } catch (error) {
      toast.error('Thêm admin thất bại');
    } finally {
      reset();
    }
  };

  const onEnable = async id => {
    try {
      if (id) {
        await enableUser(id);
        const data = await getMembers('');
        setListMember(data);
        setOpenEnableModal(false);
        toast.success('Mở khóa người dùng thành công');
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormRegisterProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaRegister),
  });

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
          {email === 'hoaittt@kozo-japan.com' ? (
            <div>Không thể khoá</div>
          ) : disableUser ? (
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
          <div className="w-1/3 bg-white shadow-lg text-gray-700 top-full right-0 py-2 px-2 rounded-3xl">
            <input
              className="outline-none"
              placeholder="Tìm kiếm...."
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Tooltip
            placement="top"
            title={isCreate ? 'Hiển thị danh sách' : 'Thêm admin'}
            onClick={() => setOpenRegisterModal(true)}
          >
            <Fab color="primary" aria-label="add">
              {isCreate ? <RemoveIcon /> : <AddIcon />}
            </Fab>
          </Tooltip>
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
      <Modal
        isOpen={openRegisterModal}
        title="Thêm admin"
        onClose={() => setOpenRegisterModal(false)}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            fullWidth
            label="Họ và tên"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <div className="my-4">
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>
          <div className="my-4">
            <TextField
              required
              fullWidth
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="my-4">
            <TextField
              required
              fullWidth
              label="Nhập lại mật khẩu"
              type={showRePassword ? 'text' : 'password'}
              {...register('repassword')}
              error={!!errors.repassword}
              helperText={errors.repassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowRePassword(!showRePassword)}
                      edge="end"
                    >
                      {showRePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="my-4">
            <TextField
              required
              fullWidth
              label="Số điện thoại"
              type="tel"
              {...register('tel')}
              error={!!errors.tel}
              helperText={errors.tel?.message}
            />
          </div>
          <div className="my-4">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Giới tính
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="male"
                row
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Nam"
                  {...register('gender')}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Nữ"
                  {...register('gender')}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Khác"
                  {...register('gender')}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="text-center">
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
            <Button size="large" variant="contained" type="submit">
              Thêm
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ManagerMember;
