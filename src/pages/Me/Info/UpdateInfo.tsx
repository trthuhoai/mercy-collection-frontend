import React, { useEffect, useState } from 'react';
import { useUser } from 'store';
import Button from '@mui/material/Button';
import { convertDate } from 'untils';
import { updateUser } from 'apis/users';
import { IFormEditProps } from './types';
import { schemaEdit } from './contants';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller, useForm } from 'react-hook-form';
import { EGender } from 'constant/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FORMAT_DATE } from 'constant';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';

const UpdateInfo = () => {
  const { user, getUser } = useUser();
  const [number, setNumber] = useState(true);

  const defaultValues = {
    name: user?.name || '',
    tel: user?.tel || '',
    gender: user?.gender || '',
    address: user?.address || '',
    birthday: user?.birthday ? new Date(user?.birthday) : null,
    telShow: user?.telShow || false,
    genderShow: user?.genderShow || false,
    nameShow: user?.nameShow || false,
    birthdayShow: user?.birthdayShow || false,
    addressShow: user?.addressShow || false,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormEditProps>({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schemaEdit),
  });
  console.log(errors);

  useEffect(() => {
    reset(defaultValues);
  }, [user]);

  const onSubmit = async data => {
    console.log(data);
    try {
      const payload = {
        ...data,
        birthday: data.birthday && convertDate(data.birthday),
      };

      await updateUser(payload);
      toast.success('Cập thông tin thành công');
      await getUser();
    } catch (error) {}
  };

  return (
    <div className="my-10 md:w-3/4 lg:w-1/2 container mx-auto">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <div className="flex items-center gap-4 my-4">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                required
                fullWidth
                label="Họ và tên"
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="nameShow"
            render={({ field }) => (
              <Checkbox
                color="secondary"
                defaultChecked={user?.nameShow || false}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-4 my-4">
          <Controller
            control={control}
            name="tel"
            render={({ field }) => (
              <TextField
                fullWidth
                label="Số điện thoại"
                type="tel"
                {...field}
                error={!!errors.tel}
                helperText={errors.tel?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="telShow"
            render={({ field }) => (
              <Checkbox
                color="secondary"
                defaultChecked={user?.telShow || false}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-4 my-4">
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <TextField
                fullWidth
                label="Địa chỉ"
                {...field}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="addressShow"
            render={({ field }) => (
              <Checkbox
                color="secondary"
                defaultChecked={user?.addressShow || false}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-4 my-4">
          <Controller
            control={control}
            name="birthday"
            render={({ field }) => (
              <DatePicker
                inputFormat={FORMAT_DATE.YEAR_MONTH_DAY}
                label="Ngày sinh"
                {...field}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={!!errors.birthday}
                    helperText={errors.birthday?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="birthdayShow"
            render={({ field }) => (
              <Checkbox
                color="secondary"
                defaultChecked={user?.birthdayShow || false}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-4 my-4">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Giới tính</FormLabel>
            <Controller
              control={control}
              name="gender"
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  value={value}
                >
                  <FormControlLabel
                    value={EGender.MALE}
                    control={<Radio />}
                    label="Nam"
                    onChange={onChange}
                  />
                  <FormControlLabel
                    value={EGender.FEMALE}
                    control={<Radio />}
                    label="Nữ"
                    onChange={onChange}
                  />
                  <FormControlLabel
                    value={EGender.OTHER}
                    control={<Radio />}
                    label="Khác"
                    onChange={onChange}
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          <Controller
            control={control}
            name="genderShow"
            render={({ field }) => (
              <Checkbox
                color="secondary"
                defaultChecked={user?.genderShow || false}
                {...field}
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
            Cập nhật thông tin
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdateInfo;
