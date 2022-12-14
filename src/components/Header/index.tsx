import React, { useEffect, useState } from 'react';
import Typo from 'components/Typo';
import { gapi } from 'gapi-script';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {
  generatePath,
  Link,
  matchPath,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
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
import {
  IFormLoginProps,
  IFormRegisterProps,
  IFormResetPasswordProps,
  IFormNewPasswordProps,
} from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  schemaLogin,
  schemaRegister,
  schemaResetPassword,
  schemaNewPassword,
} from './constant';
import {
  authByGoggle,
  createUser,
  getInfoUser,
  loginWithUser,
  verifyUser,
  checkMail,
  setNewPassword,
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
import useDebounce from 'hooks/useDebounce';
import { useSearch } from 'store/search';

const Header = () => {
  const classNameNavLink = 'hover:text-gray-500 pb-2';
  const activeStyle = 'border-b-2 border-white hover:border-gray-500';
  const { user, setUser, clearUser, setLocked } = useUser();
  const { setValue } = useSearch();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const [openNewPasswordModal, setOpenNewPasswordModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [hasSearch, setHasSearch] = useState(false);
  const [verify, setVerify] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const valueSearch = useDebounce<string>(search);
  const { pathname } = useLocation();

  const { memberId, key, email, code } = useParams();

  useEffect(() => {
    if (!matchPath(routes.SEARCH, pathname) && valueSearch) {
      navigate(generatePath(routes.SEARCH));
    }
    setValue(valueSearch);
  }, [valueSearch]);

  const handleClickName = event => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    (async () => {
      console.log('AAA', memberId, key);
      if (memberId) {
        const data = await verifyUser(memberId, key);
        console.log('Data', data);
        if (data.token) {
          localStorage.setItem(ELocalStorageKey.ACCESS_TOKEN, data.token);
          const dataUser = await getInfoUser();
          setUser(dataUser);
          toast.success('B???n ???? x??c minh t??i kho???n th??nh c??ng');
          setOpenLoginModal(false);
        } else {
          setOpenLoginModal(true);
          // setVerify(
          //   'Tr?????c khi ????ng nh???p, h??y x??c minh t??i kho???n c???a b???n b???ng c??ch click v??o li??n k???t ch??ng t??i ???? g???i qua email m?? b???n ????ng k??',
          // );
        }
      }
      if (email) {
        setOpenNewPasswordModal(true);
      }
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId:
            '297601202079-6h8hefjps9ipp7s0de5ffmophdlkfcpa.apps.googleusercontent.com',
        });
      });
    })();
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
      } catch (error: any) {
        if (error.code === 400) {
          const data = await getInfoUser();
          setUser(data);
        }
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setVerify('');
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

  const {
    register: registerResetPassword,
    handleSubmit: handleSubmitResetPassword,
    reset: resetPassword,
    formState: { errors: errorsResetPassword },
  } = useForm<IFormResetPasswordProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaResetPassword),
  });

  const {
    register: registerNewPassword,
    handleSubmit: handleSubmitNewPassword,
    reset: newPassword,
    formState: { errors: errorsNewPassword },
  } = useForm<IFormNewPasswordProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaNewPassword),
  });

  const onSubmit = async data => {
    try {
      await createUser(data);
      toast.success('????ng k?? th??nh c??ng');
      setOpenLoginModal(true);
      setVerify(
        'Tr?????c khi ????ng nh???p, h??y x??c minh t??i kho???n c???a b???n b???ng c??ch click v??o li??n k???t ch??ng t??i ???? g???i qua email m?? b???n ????ng k??',
      );
      resetLogin(data);
    } catch (error) {
      toast.error('????ng k?? th???t b???i');
    } finally {
      setOpenRegisterModal(false);
      reset();
    }
  };

  const onSubmitLogin = async data => {
    try {
      const dataLogin = await loginWithUser(data);
      if (dataLogin.verify === false) {
        setVerify(
          'Tr?????c khi ????ng nh???p, h??y x??c minh t??i kho???n c???a b???n b???ng c??ch click v??o li??n k???t ch??ng t??i ???? g???i qua email m?? b???n ????ng k??',
        );
      } else {
        localStorage.setItem(ELocalStorageKey.ACCESS_TOKEN, dataLogin.token);
        const dataUser = await getInfoUser();
        setUser(dataUser);
        toast.success('????ng nh???p th??nh c??ng');
        setOpenLoginModal(false);
      }
    } catch (error: any) {
      toast.error('????ng nh???p th???t b???i');
      setVerify('Th??ng tin ????ng nh???p kh??ng ????ng');
    } finally {
      // setOpenLoginModal(false);
    }
  };

  const onSubmitResetPassword = async data => {
    try {
      const dataCheck = await checkMail(data);
      toast.error(dataCheck);
      if (dataCheck.success === true) {
        toast.success(
          'G???i email th??nh c??ng, m??? mail c???a b???n ????? c?? th??? th??m m???t kh???u m???i',
        );
        setOpenResetPasswordModal(false);
      }
    } catch (error: any) {
      // setNotification('Kh??ng c?? t??i kho???n v???i email n??y');
      toast.error('Kh??ng c?? t??i kho???n v???i email n??y');
    } finally {
      // setOpenLoginModal(false);
    }
  };

  const onSubmitNewPassword = async data => {
    try {
      data.passwordCode = code;
      data.email = email;
      const dataCheck = await setNewPassword(data);
      localStorage.setItem(ELocalStorageKey.ACCESS_TOKEN, dataCheck.token);
      const dataUser = await getInfoUser();
      setUser(dataUser);
      toast.success('C???p nh???t m???t kh???u m???i th??nh c??ng');
      setOpenNewPasswordModal(false);
    } catch (error: any) {
      // setNotification('Kh??ng c?? t??i kho???n v???i email n??y');
      toast.error('B???n ???? c???p nh???t m???t kh???u m???i!');
    } finally {
      // setOpenLoginModal(false);
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
          <div className="hidden lg:flex gap-16 ml-28">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${classNameNavLink} ${isActive && activeStyle}`
              }
            >
              Trang ch???
            </NavLink>
            {/* <NavLink
              to="/campaigns"
              className={({ isActive }) =>
                `${classNameNavLink} ${isActive && activeStyle}`
              }
            >
              G??y qu???
            </NavLink> */}
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${classNameNavLink} ${isActive && activeStyle}`
              }
            >
              D??? ??n
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
              ???ng h???
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${classNameNavLink} ${isActive && activeStyle}`
              }
            >
              V??? ch??ng t??i
            </NavLink>
          </div>
          <div className="relative ml-0 lg:ml-0">
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
                  placeholder="T??m ki???m...."
                  onChange={e => setSearch(e.target.value)}
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
                  {user.permission === 'ADMIN' ? (
                    <Link to={routes.ADMIN.INFO}>Qu???n l??</Link>
                  ) : (
                    <Link to={routes.ME.INFO}>Th??ng tin</Link>
                  )}
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
                      ????ng xu???t
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
                ????ng k??
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenLoginModal(true)}
              >
                ????ng nh???p
              </Button>
            </div>
          )}
        </div>
      </header>
      <Modal
        isOpen={openLoginModal}
        title="????ng nh???p"
        onClose={() => setOpenLoginModal(false)}
      >
        <Box
          component="form"
          onSubmit={handleSubmitLogin(onSubmitLogin)}
          noValidate
          autoComplete="off"
        >
          {<div className="text-red-600 mb-3">{verify}</div>}
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
              label="M???t kh???u"
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
              ????ng k??
            </Button>
            <Button size="large" variant="contained" type="submit">
              ????ng nh???p
            </Button>
          </div>
          <Typo className="mb-4 text-center">ho???c ????ng nh???p v???i</Typo>
          <div className="text-center">
            <GoogleLogin
              clientId="297601202079-6h8hefjps9ipp7s0de5ffmophdlkfcpa.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              prompt="select_account"
            />
          </div>
          <Typo
            className="mb-4 text-center underline cursor-pointer caret-red-900 hover:text-lime-900"
            onClick={() => {
              setOpenResetPasswordModal(true);
              setOpenLoginModal(false);
            }}
          >
            Qu??n m???t kh???u?
          </Typo>
        </Box>
      </Modal>
      <Modal
        isOpen={openRegisterModal}
        title="????ng k??"
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
              ????ng k??
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        isOpen={openResetPasswordModal}
        title="Qu??n m???t kh???u"
        onClose={() => setOpenResetPasswordModal(false)}
      >
        <Box
          component="form"
          onSubmit={handleSubmitResetPassword(onSubmitResetPassword)}
          noValidate
          autoComplete="off"
        >
          <div className="my-4">
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              {...registerResetPassword('email')}
              error={!!errorsResetPassword.email}
              helperText={errorsResetPassword.email?.message}
            />
          </div>
          {/* {<div className="text-red-600 mb-3">{notification}</div>} */}
          <div className="text-center">
            <Button
              sx={{
                marginRight: '48px',
              }}
              size="large"
              variant="outlined"
              onClick={() => setOpenResetPasswordModal(false)}
            >
              H???y
            </Button>
            <Button size="large" variant="contained" type="submit">
              G???i email
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        isOpen={openNewPasswordModal}
        title="C???p nh???t m???t m???u m???i"
        onClose={() => setOpenNewPasswordModal(false)}
      >
        <Box
          component="form"
          onSubmit={handleSubmitNewPassword(onSubmitNewPassword)}
          noValidate
          autoComplete="off"
        >
          <div className="my-4">
            <TextField
              required
              fullWidth
              label="M???t kh???u"
              type={showPassword ? 'text' : 'password'}
              {...registerNewPassword('password')}
              error={!!errorsNewPassword.password}
              helperText={errorsNewPassword.password?.message}
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
              {...registerNewPassword('repassword')}
              error={!!errorsNewPassword.repassword}
              helperText={errorsNewPassword.repassword?.message}
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
          {/* {<div className="text-red-600 mb-3">{notification}</div>} */}
          <div className="text-center">
            <Button
              sx={{
                marginRight: '48px',
              }}
              size="large"
              variant="outlined"
              onClick={() => setOpenNewPasswordModal(false)}
            >
              H???y
            </Button>
            <Button size="large" variant="contained" type="submit">
              X??c nh???n
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
