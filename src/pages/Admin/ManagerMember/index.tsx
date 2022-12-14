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
        toast.success('Kh??a ng?????i d??ng th??nh c??ng');
      }
    } catch (error) {
      toast.error('Th???t b???i');
    } finally {
      setOpenDisableModal(false);
    }
  };

  const onSubmit = async data => {
    try {
      await createAdmin(data);
      toast.success('Th??m admin th??nh c??ng');
      setOpenRegisterModal(false);
      const dataMembers = await getMembers('');
      setListMember(dataMembers);
    } catch (error) {
      toast.error('Th??m admin th???t b???i');
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
        toast.success('M??? kh??a ng?????i d??ng th??nh c??ng');
      }
    } catch (error) {
      toast.error('???? c?? l???i x???y ra');
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
            <img src={picture || '/avartar.png'} alt="???nh ?????i di???n" />
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
            <div>Kh??ng th??? kho??</div>
          ) : disableUser ? (
            <Button
              variant="contained"
              onClick={e => {
                e.stopPropagation();
                setPosition(id);
                setOpenEnableModal(true);
              }}
            >
              M??? kho??
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
              Kho??
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
            Danh s??ch th??nh vi??n
          </Typo>
          <div className="w-1/3 bg-white shadow-lg text-gray-700 top-full right-0 py-2 px-2 rounded-3xl">
            <input
              className="outline-none"
              placeholder="T??m ki???m...."
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Tooltip
            placement="top"
            title={isCreate ? 'Hi???n th??? danh s??ch' : 'Th??m admin'}
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
            <Typo>Kh??ng c?? th??nh vi??n</Typo>
          )}
        </div>
      </div>
      <Modal
        isOpen={openDisableModal}
        title="X??c nh???n v?? hi???u ho??"
        onClose={() => setOpenDisableModal(false)}
      >
        B???n c?? ch???c ch???n mu???n v?? hi???u ho?? t??i kho???n n??y kh??ng?
        <div className="text-center mt-4">
          <Button
            sx={{
              marginRight: '48px',
            }}
            size="large"
            variant="outlined"
            onClick={() => setOpenDisableModal(false)}
          >
            H???y
          </Button>
          <Button
            color="error"
            size="large"
            variant="contained"
            type="submit"
            onClick={() => onDisable(position)}
          >
            X??c nh???n
          </Button>
          {/* <button className='bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:bg-red-600 rounded mt-6' onClick={onCancel}>
        Hu??? ????ng k??
      </button> */}
        </div>
      </Modal>
      <Modal
        isOpen={openEnableModal}
        title="X??c nh???n m??? l???i t??i kho???n"
        onClose={() => setOpenEnableModal(false)}
      >
        B???n c?? ch???c ch???n mu???n b??? v?? hi???u ho?? t??i kho???n n??y kh??ng?
        <div className="text-center mt-4">
          <Button
            sx={{
              marginRight: '48px',
            }}
            size="large"
            variant="outlined"
            onClick={() => setOpenEnableModal(false)}
          >
            H???y
          </Button>
          <Button
            color="error"
            size="large"
            variant="contained"
            type="submit"
            onClick={() => onEnable(position)}
          >
            X??c nh???n
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={openRegisterModal}
        title="Th??m admin"
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
            label="H??? v?? t??n"
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
              label="M???t kh???u"
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
              label="Nh???p l???i m???t kh???u"
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
              label="S??? ??i???n tho???i"
              type="tel"
              {...register('tel')}
              error={!!errors.tel}
              helperText={errors.tel?.message}
            />
          </div>
          <div className="my-4">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Gi???i t??nh
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
                  label="N???"
                  {...register('gender')}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Kh??c"
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
              H???y
            </Button>
            <Button size="large" variant="contained" type="submit">
              Th??m
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ManagerMember;
