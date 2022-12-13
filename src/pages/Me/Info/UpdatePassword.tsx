import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { IFormEditPasswordProps } from './types';
import { schemaEditPassword } from './contants';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getInfoUser, updatePassword } from 'apis/users';
import Loading from 'components/Loading';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

const UpdatePassword = () => {
  const [havePassword, setHavePassword] = useState<boolean>();
  const [message, setMessage] = useState<string>('');
  const defaultValues = {
    oldPassword: '',
    password: '',
    reNewPassword: '',
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [showPasswordOld, setShowPasswordOld] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getInfoUser();
      setHavePassword(data.pass);
    })();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormEditPasswordProps>({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schemaEditPassword),
  });

  const onSubmit = async data => {
    try {
      const result = await updatePassword(data);
      console.log(result);
      toast.success('Cập mật khẩu thành công');
      setHavePassword(true);
      setMessage('Bạn đã cập nhật mật khẩu thành công! ');
      reset();
    } catch (error) {
      setMessage('Mật khẩu cũ không đúng! ');
      console.log(error);
    }
  };

  if (havePassword === undefined) return <Loading />;

  return (
    <div className="my-10 md:w-3/4 lg:w-1/3 container mx-auto">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <div className="text-red-700 mb-3">{message}</div>
        {havePassword && (
          <Controller
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <TextField
                fullWidth
                required
                type={showPasswordOld ? 'text' : 'password'}
                label="Nhập mật khẩu cũ"
                {...field}
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPasswordOld(!showPasswordOld)}
                        edge="end"
                      >
                        {showPasswordOld ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        )}
        <div className="my-4">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                fullWidth
                required
                type={showPassword ? 'text' : 'password'}
                label="Mật khẩu mới"
                {...field}
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
            )}
          />
        </div>
        <div className="my-4">
          <Controller
            control={control}
            name="reNewPassword"
            render={({ field }) => (
              <TextField
                fullWidth
                required
                type={showRePassword ? 'text' : 'password'}
                label="Xác nhận mật khẩu mới"
                {...field}
                error={!!errors.reNewPassword}
                helperText={errors.reNewPassword?.message}
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
            )}
          />
        </div>
        <div className="text-center mt-10">
          <Button
            size="large"
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            Cập nhật mật khẩu
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdatePassword;
