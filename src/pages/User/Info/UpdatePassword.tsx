import React from 'react';
import Button from '@mui/material/Button';
import { IFormEditPasswordProps } from './types';
import { schemaEditPassword } from './contants';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
  };

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
      toast.success('Cập thông tin thành công');
      reset();
    } catch (error) {}
  };

  return (
    <div className="my-10 w-1/3 container mx-auto">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Controller
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <TextField
              required
              fullWidth
              label="Nhập mật khẩu cũ"
              {...field}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword?.message}
            />
          )}
        />
        <div className="my-4">
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <TextField
                fullWidth
                required
                label="Mật khẩu mới"
                {...field}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
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
