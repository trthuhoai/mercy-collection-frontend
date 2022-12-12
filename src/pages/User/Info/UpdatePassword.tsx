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


const UpdatePassword = () => {
  const [havePassword, setHavePassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const defaultValues = {
    oldPassword: '',
    password: '',
    reNewPassword: '',
  };

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
      const result =await updatePassword(data)
      console.log(result)
      toast.success('Cập mật khẩu thành công');
      setHavePassword(true)
      setMessage("Bạn đã cập nhật mật khẩu thành công! ")
      reset();
    } catch (error) {
      setMessage("Mật khẩu cũ không đúng! ")
      console.log(error)
    }
  };

  return (
    <div className="my-10 w-1/3 container mx-auto">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
<div  className='text-red-700 mb-3'>{message}</div>
        {havePassword&&
        (<Controller
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <TextField
              fullWidth
              required
              type="password"
              label="Nhập mật khẩu cũ"
              {...field}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword?.message}
            />
          )}
        />)
      }
        <div className="my-4">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                fullWidth
                required
                label="Mật khẩu mới"
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
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
                label="Xác nhận mật khẩu mới"
                {...field}
                error={!!errors.reNewPassword}
                helperText={errors.reNewPassword?.message}
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
