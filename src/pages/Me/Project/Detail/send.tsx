import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { CATEGORY, FORMAT_DATE } from 'constant';
import { Controller, useForm } from 'react-hook-form';
import { IFormMailProps } from './types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { schemaSendMail } from './constant';
import { convertDate, getBase64 } from 'untils';
import { createProject, sendMailProject } from 'apis/projects';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router-dom';

interface IProps {
  // onGetListProject: () => void;
  onSetIsSendMail: (bl: boolean) => void;
}

const SendMail = ({ onSetIsSendMail }: IProps) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [noti, setNoti] = useState('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const { id } = useParams();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormMailProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaSendMail),
  });

  const getValue = e => {
    if (e.target.checked) {
      setDisabled(true);
      // setReasion(true)
    } else {
      setDisabled(false);

      // setReasion(false)
    }
    // console.warn(reasion)
  };

  // const watchInputFile = watch('pictureFile');

  const onSubmit = async data => {
    try {
      if (disabled) {
        await sendMailProject(id, data);
        toast.success('Gửi email thành công!');
      } else {
        if (data.message === '' || data.title === '') {
          setNoti('Bắt buộc điền Tiêu đề và Nội dung');
        } else {
          await sendMailProject(id, data);
          toast.success('Gửi email thành công!');
        }
      }
    } catch (error) {
      toast.error('Tạo dự án thất bại');
    }
  };

  return (
    <div className="my-10">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <div className="my-4">
          <Checkbox color="secondary" value="1" onClick={e => getValue(e)} />{' '}
          Gửi thông tin hoạt động giống với thông tin đã đăng tải trên Mercy
          Collection .
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
          <div className="flex-1">
            <div className="mb-2">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    disabled={disabled}
                    label="Tiêu đề"
                    // {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </div>
            <div className="mb-8">
              <TextField
                required
                fullWidth
                multiline
                disabled={disabled}
                label="Nội dung"
                {...register('message')}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            </div>
          </div>
        </div>
        {<div className="text-red-600 mb-3">{noti}</div>}
        <div className="text-center mt-8">
          <Button
            size="large"
            variant="outlined"
            sx={{
              marginRight: '24px',
            }}
            onClick={() => onSetIsSendMail(false)}
          >
            Hủy
          </Button>
          <Button size="large" variant="contained" type="submit">
            Gửi mail
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default SendMail;
