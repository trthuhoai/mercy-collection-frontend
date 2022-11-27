import React from 'react';
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
import { IPropsCreateForm } from './types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { defaultValues, schemaCreate } from './constant';
import { convertDate, getBase64 } from 'untils';
import { createProject } from 'apis/projects';
import { toast } from 'react-toastify';

interface IProps {
  onGetListProject: () => void;
  onSetIsCreate: (bl: boolean) => void;
}

const CreateProject = ({ onGetListProject, onSetIsCreate }: IProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPropsCreateForm>({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schemaCreate),
  });

  const watchInputFile = watch('pictureFile');

  const onSubmit = async data => {
    try {
      const body = {
        ...data,
        deadline: convertDate(data.deadline),
        deadlineTime: convertDate(data.deadlineTime, FORMAT_DATE.HOUR_MINUTE),
        startAt: convertDate(data.startAt),
        endAt: convertDate(data.endAt),
        pictureFile: await getBase64(data.pictureFile[0]),
        startTime: convertDate(data.startTime, FORMAT_DATE.HOUR_MINUTE),
        endTime: convertDate(data.endTime, FORMAT_DATE.HOUR_MINUTE),
      };
      await createProject(body);
      onGetListProject();
      toast.success('Tạo dự án thành công');
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
        <div className="flex gap-20">
          <div className="flex-1">
            <div className="mb-8">
              <TextField
                required
                fullWidth
                label="Tiêu đề"
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </div>
            <div className="mb-8">
              <TextField
                required
                fullWidth
                label="Nội dung"
                {...register('content')}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            </div>
            <div className="mb-8">
              <TextField
                required
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                label="Mục tiêu"
                {...register('people')}
                error={!!errors.people}
                helperText={errors.people?.message}
              />
            </div>
            <div className="mb-8">
              <TextField
                required
                fullWidth
                label="Địa điểm"
                {...register('location')}
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <Button variant="contained" component="label">
                  Tải ảnh lên
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    {...register('pictureFile')}
                  />
                </Button>
              </div>
              {watchInputFile && (
                <div className="w-64 h-64">
                  <img
                    src={URL.createObjectURL(watchInputFile[0])}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-8">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Danh mục
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Danh mục"
                  {...register('category')}
                  error={!!errors.category}
                >
                  {CATEGORY.map(({ label, value }) => (
                    <MenuItem value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex items-center gap-10 mb-8">
              <Controller
                control={control}
                name="deadline"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    inputFormat={FORMAT_DATE.YEAR_MONTH_DAY}
                    label="Ngày hạn cuối"
                    value={value}
                    onChange={onChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        error={!!errors.deadline}
                        helperText={errors.deadline?.message}
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="deadlineTime"
                render={({ field: { onChange, value } }) => (
                  <TimePicker
                    ampm={false}
                    label="Giờ hạn cuối"
                    value={value}
                    onChange={onChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        error={!!errors.deadlineTime}
                        helperText={errors.deadlineTime?.message}
                      />
                    )}
                  />
                )}
              />
            </div>
            <div className="flex items-center gap-10 mb-8">
              <Controller
                control={control}
                name="startAt"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    inputFormat={FORMAT_DATE.YEAR_MONTH_DAY}
                    label="Ngày bắt đầu"
                    value={value}
                    onChange={onChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        error={!!errors.startAt}
                        helperText={errors.startAt?.message}
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="startTime"
                render={({ field: { onChange, value } }) => (
                  <TimePicker
                    ampm={false}
                    label="Giờ bắt đầu"
                    value={value}
                    onChange={onChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        error={!!errors.startTime}
                        helperText={errors.startTime?.message}
                      />
                    )}
                  />
                )}
              />
            </div>
            <div className="flex items-center gap-10 mb-8">
              <Controller
                control={control}
                name="endAt"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    inputFormat={FORMAT_DATE.YEAR_MONTH_DAY}
                    label="Ngày kết thúc"
                    value={value}
                    onChange={onChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        error={!!errors.endAt}
                        helperText={errors.endAt?.message}
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="endTime"
                render={({ field: { onChange, value } }) => (
                  <TimePicker
                    ampm={false}
                    label="Giờ kết thúc"
                    value={value}
                    onChange={onChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        error={!!errors.endTime}
                        helperText={errors.endTime?.message}
                      />
                    )}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Button
            size="large"
            variant="outlined"
            sx={{
              marginRight: '24px',
            }}
            onClick={() => onSetIsCreate(false)}
          >
            Hủy
          </Button>
          <Button size="large" variant="contained" type="submit">
            Tạo
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default CreateProject;
