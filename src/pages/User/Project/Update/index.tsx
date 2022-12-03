import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typo from 'components/Typo';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CATEGORY, FORMAT_DATE } from 'constant';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useEffect, useState } from 'react';
import { IProjectDetail, IPropsUpdateForm } from './types';
import { defaultValues, schemaUpdate } from './constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { getProjectsDetail, updateProject, cancelProject } from 'apis/projects';
import { convertDate, getBase64 } from 'untils';
import { toast } from 'react-toastify';


const UpdateProject = () => {
  const { id } = useParams();
  const [inactive, setInactive] = useState(true)
  const [project, setProject] = useState<IProjectDetail | null>(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IPropsUpdateForm>({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schemaUpdate),
  });
  const watchInputFile = watch('pictureFile');

  useEffect(() => {
    // setInterval(() => {
    //   console.log('AFTER 3S');

    // }, 3000);
    (async () => {
      if (id) {
        const data = await getProjectsDetail(id);
        setProject(data);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (project) {
      if (project.status === 'ACTIVE') {
        setInactive(false)
      }
      reset({
        title: project.title,
        content: project.content,
        people: project.people,
        category: project.category,
        deadline: project.deadline,
        deadlineTime: project.deadline + ' ' + project.deadlineTime,
        startAt: project.startAt,
        endAt: project.endAt,
        startTime: project.deadline + ' ' +
          project.startTime,
        endTime: project.deadline + ' ' + project.endTime,
        location: project.location,
        pictureFile: project.pictureUrl,
      })
    }

  }, [project])

  const cancel = async () => {
    await cancelProject(id)
  }
  const onSubmit = async data => {
    console.log(data);
    try {
      const body = {
        ...data,
        deadline: convertDate(data.deadline),
        deadlineTime: convertDate(data.deadlineTime, FORMAT_DATE.HOUR_MINUTE),
        startAt: convertDate(data.startAt),
        endAt: convertDate(data.endAt),
        pictureFile: typeof data.pictureFile === "string" ? undefined
          : await getBase64(data.pictureFile[0]),
        startTime: convertDate(data.startTime, FORMAT_DATE.HOUR_MINUTE),
        endTime: convertDate(data.endTime, FORMAT_DATE.HOUR_MINUTE),
        content: data.content
      };

      await updateProject(body, id);
      // onGetListProject();
      toast.success('Cập nhật dự án thành công');
    } catch (error) {
      toast.error('Cập nhật dự án thất bại');
    }
  };

  return (
    <div className=" container my-10">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}

      >
        <div className="flex gap-20">
          <div className="flex-1">
            <div className="mb-8">
              <Controller
                control={control}
                name="title"
                render={({
                  field, formState: { errors }
                }) => (
                  <TextField
                    required
                    disabled={inactive}
                    fullWidth
                    label="Tiêu đề"
                    {...field}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    sx={{
                      '& input:disabled': {
                        cursor: 'not-allowed'
                      }
                    }}
                  />
                )}
              />

            </div>
            <div className="mb-8">
              <Controller
                control={control}
                name="content"

                render={({
                  field, formState: { errors }
                }) => (
                  <TextField
                    required
                    fullWidth
                    disabled={inactive}
                    multiline
                    label="Nội dung"
                    {...field}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                  />
                )}
              />

            </div>
            <div className="mb-8">
              <Controller
                control={control}
                name="people"
                render={({
                  field, formState: { errors }
                }) => (
                  <TextField
                    required
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    label="Mục tiêu"
                    disabled={inactive}
                    {...field}
                    error={!!errors.people}
                    helperText={errors.people?.message}
                  />
                )}
              />

            </div>
            <div className="mb-8">
              <Controller
                control={control}
                name="location"
                render={({
                  field, formState: { errors }
                }) => (
                  <TextField
                    required
                    fullWidth
                    disabled={inactive}
                    label="Địa điểm"
                    {...field}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                )}
              />

            </div>
            <div className="flex gap-4">
              <div>
                <Button variant="contained" component="label">
                  Tải ảnh lên
                  <input
                    hidden
                    disabled={inactive}
                    accept="image/*"
                    type="file"
                    {...register('pictureFile')}
                  />
                </Button>
              </div>
              {watchInputFile && (
                <div className="w-64 h-64">
                  <img
                    src={typeof watchInputFile === 'string' ? watchInputFile : URL.createObjectURL(watchInputFile[0])}
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
                <Controller
                  control={control}
                  name="category"
                  render={({
                    field, formState: { errors }
                  }) => {
                    console.log(field);

                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={inactive}
                        label="Danh mục"
                        {...field}
                        error={!!errors.category}
                      >
                        {CATEGORY.map(({ label, value }) => (
                          <MenuItem value={value}>{label}</MenuItem>
                        ))}
                      </Select>
                    )
                  }}
                />

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
                    disabled={inactive}
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
                    disabled={inactive}
                    onChange={(value) => {
                      console.log(value);

                      onChange(value)
                    }}
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
                    disabled={inactive}
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
                    disabled={inactive}
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
                    disabled={inactive}
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
                    disabled={inactive}
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
        {project?.status === 'ACTIVE' ?
          (<div className="text-center mt-8">

            <Button
              color='error'
              size="large"
              variant="outlined"
              sx={{
                marginRight: '24px',
              }}
              onClick={() => cancel()}
            >
              Hủy dự án
            </Button>
            <Button size="large" variant="contained" type="submit">
              Cập nhật
            </Button>
          </div >) : project?.status === 'ENDED' ? (<div className='text-center text-2xl'>Dự án đã kết thúc</div>) : project?.status === 'EXPIRED' ? (<div className='text-center text-2xl'>Dự án đã hết thời gian đăng ký</div>) : (<div className='text-center text-2xl'>Dự án đã bị huỷ</div>)}

      </Box>
    </div>
  );
};

export default UpdateProject;