import React, { useEffect, useState } from 'react';
import Typo from 'components/Typo';
import { gapi } from 'gapi-script';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Link, NavLink } from 'react-router-dom';
import { useUser } from 'store';
import Modal from 'components/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { IFormLoginProps, IFormRegisterProps } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin, schemaRegister } from './constant';
import {
  authByGoggle,
  createUser,
  getInfoUser,
  loginWithUser,
} from 'apis/users';
import { toast } from 'react-toastify';
import { ELocalStorageKey } from 'constant/types';
import { routes } from 'constant/routes';
import NavMobile from './NavMobile';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const Header = () => {
  const classNameNavLink = 'hover:text-gray-500 pb-2';
  const activeStyle = 'border-b-2 border-white hover:border-gray-500';
  const { user, setUser, clearUser } = useUser();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [hasSearch, setHasSearch] = useState(false);

  const handleClickName = event => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId:
          '297601202079-6h8hefjps9ipp7s0de5ffmophdlkfcpa.apps.googleusercontent.com',
      });
    });
  }, []);

  const responseGoogle = async response => {
    if (response.profileObj) {
      try {
        setOpenLoginModal(false);
        localStorage.setItem(
          ELocalStorageKey.ACCESS_TOKEN,
          response.accessToken,
        );
        await authByGoggle();
        const data = await getInfoUser();
        setUser(data);
      } catch (error) {
        const data = await getInfoUser();
        setUser(data);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setAnchorEl(null);
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

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLogin,
    formState: { errors: errorsLogin },
  } = useForm<IFormLoginProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit = async data => {
    try {
      await createUser(data);
      toast.success('Đăng kí thành công');
      setOpenLoginModal(true);
      resetLogin(data);
    } catch (error) {
      toast.error('Đăng kí thất bại');
    } finally {
      setOpenRegisterModal(false);
      reset();
    }
  };

  const onSubmitLogin = async data => {
    try {
      const dataLogin = await loginWithUser(data);
      localStorage.setItem(ELocalStorageKey.ACCESS_TOKEN, dataLogin.token);
      const dataUser = await getInfoUser();
      setUser(dataUser);
      toast.success('Đăng nhập thành công');
    } catch (error) {
      toast.error('Đăng nhập thất bại');
    } finally {
      setOpenLoginModal(false);
    }
  };

  return (
    <>
      {/* <div className="hidden">
        <GoogleLogin
          clientId="297601202079-6h8hefjps9ipp7s0de5ffmophdlkfcpa.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          isSignedIn={true}
          cookiePolicy={'single_host_origin'}
        />
      </div> */}
      <header className="z-10 sticky top-0 h-14 bg-green-900 text-white">
        <div className="container h-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10">
              <img src="/logo.png" alt="logo" className="w-full h-full" />
            </div>
            <Typo size="large" className="ml-4 text-white">
              Mercy Collection
            </Typo>
          </div>
          <NavMobile
            onLogin={() => setOpenLoginModal(true)}
            onLogout={handleLogout}
          />
          <div className="hidden lg:flex gap-16">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${classNameNavLink} ${isActive && activeStyle}`
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/campaigns"
              className={({ isActive }) =>
                `${classNameNavLink} ${isActive && activeStyle}`
              }
            >
              Dự án
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${classNameNavLink} ${isActive && activeStyle}`
              }
            >
              Tình nguyện
            </NavLink>
            <NavLink
              to="/faqs"
              className={({ isActive }) =>
                `${classNameNavLink} ${isActive && activeStyle}`
              }
            >
              Faqs
            </NavLink>
            <NavLink
              to="/donate"
              className={({ isActive }) =>
                `${classNameNavLink} ${isActive && activeStyle}`
              }
            >
              Ủng hộ
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${classNameNavLink} ${isActive && activeStyle}`
              }
            >
              Về chúng tôi
            </NavLink>
          </div>
          <div className="relative ml-4 lg:ml-0">
            <div
              className="cursor-pointer hover:text-gray-400"
              onClick={() => setHasSearch(!hasSearch)}
            >
              {hasSearch ? <SearchOffIcon /> : <SearchIcon />}
            </div>
            {hasSearch && (
              <div className="absolute bg-white shadow-lg text-gray-700 top-full right-0 py-2 px-6 rounded-3xl">
                <input
                  className="w-[200px] outline-none"
                  placeholder="Tìm kiếm...."
                />
              </div>
            )}
          </div>
          {user ? (
            <div className="hidden lg:block">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleClickName}
              >
                <Typo className="mr-4 text-white" size="large">
                  {user.name}
                </Typo>
                <div className="w-10 h-10">
                  <img
                    src={user.picture || '/avartar.png'}
                    alt="avatar"
                    className="rounded-full w-full h-full"
                  />
                </div>
              </div>
              <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 46,
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <AccountCircleIcon
                    fontSize="small"
                    sx={{ marginRight: '8px' }}
                  />
                  <Link to={routes.ME.INFO}>Thông tin</Link>
                </MenuItem>
                <GoogleLogout
                  clientId="297601202079-6h8hefjps9ipp7s0de5ffmophdlkfcpa.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={handleLogout}
                  render={renderProps => (
                    <MenuItem
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <LogoutIcon
                        fontSize="small"
                        sx={{ marginRight: '8px' }}
                      />
                      Đăng xuất
                    </MenuItem>
                  )}
                />
              </Menu>
            </div>
          ) : (
            <div className="hidden lg:block">
              <Button
                sx={{
                  marginRight: '8px',
                  color: 'white',
                  hover: 'red',
                }}
                onClick={() => {
                  setOpenRegisterModal(true);
                }}
              >
                Đăng kí
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenLoginModal(true)}
              >
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      </header>
      <Modal
        isOpen={openLoginModal}
        title="Đăng nhập"
        onClose={() => setOpenLoginModal(false)}
      >
        <Box
          component="form"
          onSubmit={handleSubmitLogin(onSubmitLogin)}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            {...registerLogin('email')}
            error={!!errorsLogin.email}
            helperText={errorsLogin.email?.message}
          />
          <div className="my-4">
            <TextField
              required
              fullWidth
              label="Mật khẩu"
              type={showPasswordLogin ? 'text' : 'password'}
              {...registerLogin('password')}
              error={!!errorsLogin.password}
              helperText={errorsLogin.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                      edge="end"
                    >
                      {showPasswordLogin ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="text-center mb-8">
            <Button
              size="large"
              variant="outlined"
              sx={{
                marginRight: '24px',
              }}
              onClick={() => {
                setOpenLoginModal(false);
                setOpenRegisterModal(true);
              }}
            >
              Đăng kí
            </Button>
            <Button size="large" variant="contained" type="submit">
              Đăng nhập
            </Button>
          </div>
          <Typo className="mb-4 text-center">hoặc đăng nhập với</Typo>
          <div className="text-center">
            <GoogleLogin
              clientId="297601202079-6h8hefjps9ipp7s0de5ffmophdlkfcpa.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              prompt="select_account"
            />
          </div>
        </Box>
      </Modal>
      <Modal
        isOpen={openRegisterModal}
        title="Đăng kí"
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
              Đăng kí
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
