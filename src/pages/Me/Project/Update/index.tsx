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
import { defaultValues, schemaUpdate, schemaCancel } from './constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { getProjectsDetail, updateProject, cancelProject } from 'apis/projects';
import { convertDate, getBase64 } from 'untils';
import { toast } from 'react-toastify';
import Modal from 'components/Modal';
import { IFormResionProps } from 'components/Header/types';
import { Checkbox } from '@mui/material';

const UpdateProject = () => {
  const { id } = useParams();
  const [inactive, setInactive] = useState(true);
  const [reasion, setReasion] = useState(false);
  const [project, setProject] = useState<IProjectDetail | null>(null);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const getValue = e => {
    if (e.target.checked) {
      setReasion(true);
    } else {
      setReasion(false);
    }
    console.warn(reasion);
  };
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

  const {
    register: registerCancel,
    handleSubmit: handleSubmitCancel,
    reset: resetCancel,
    formState: { errors: errorsCancel },
  } = useForm<IFormResionProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaCancel),
  });

  const watchInputFile = watch('pictureFile');

  const onCancel = async data => {
    if (reasion) {
      console.log(data);
      try {
        const body = {
          ...data,
        };

        if (id) {
          await cancelProject(body, id);
          if (id) {
            const data = await getProjectsDetail(id);
            setProject(data);
          }
          setOpenCancelModal(false);
          toast.success('Hu??? d??? ??n th??nh c??ng');
        }
      } catch (error) {
        toast.error('Hu??? d??? ??n th???t b???i');
      }
    }
  };

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
      if (project.status === 'ACTIVE' || project.status === 'PENDING') {
        setInactive(false);
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
        startTime: project.deadline + ' ' + project.startTime,
        endTime: project.deadline + ' ' + project.endTime,
        location: project.location,
        pictureFile: project.pictureUrl,
      });
    }
  }, [project]);

  const onSubmit = async data => {
    try {
      const body = {
        ...data,
        deadline: convertDate(data.deadline),
        deadlineTime: convertDate(data.deadlineTime, FORMAT_DATE.HOUR_MINUTE),
        startAt: convertDate(data.startAt),
        endAt: convertDate(data.endAt),
        pictureFile:
          typeof data.pictureFile === 'string'
            ? undefined
            : await getBase64(data.pictureFile[0]),
        startTime: convertDate(data.startTime, FORMAT_DATE.HOUR_MINUTE),
        endTime: convertDate(data.endTime, FORMAT_DATE.HOUR_MINUTE),
        content: data.content,
      };

      await updateProject(body, id);
      // onGetListProject();
      toast.success('C???p nh???t d??? ??n th??nh c??ng');
    } catch (error) {
      toast.error('C???p nh???t d??? ??n th???t b???i');
    }
  };

  return (
    <>
      <div className=" container my-10">
        <div className="bg-white p-4 rounded-md !text-black">
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-20">
              <div className="flex-1">
                <div className="mb-8">
                  <Controller
                    control={control}
                    name="title"
                    render={({ field, formState: { errors } }) => (
                      <TextField
                        required
                        disabled={inactive}
                        fullWidth
                        label="Ti??u ?????"
                        {...field}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                      />
                    )}
                  />
                </div>
                <div className="mb-8">
                  <Controller
                    control={control}
                    name="content"
                    render={({ field, formState: { errors } }) => (
                      <TextField
                        required
                        fullWidth
                        disabled={inactive}
                        multiline
                        label="N???i dung"
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
                    render={({ field, formState: { errors } }) => (
                      <TextField
                        required
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        label="M???c ti??u"
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
                    render={({ field, formState: { errors } }) => (
                      <TextField
                        required
                        fullWidth
                        disabled={inactive}
                        label="?????a ??i???m"
                        {...field}
                        error={!!errors.location}
                        helperText={errors.location?.message}
                      />
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <Button
                      variant="contained"
                      component="label"
                      disabled={inactive}
                    >
                      T???i ???nh l??n
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
                        src={
                          typeof watchInputFile === 'string'
                            ? watchInputFile
                            : URL.createObjectURL(watchInputFile[0])
                        }
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
                      Danh m???c
                    </InputLabel>
                    <Controller
                      control={control}
                      name="category"
                      render={({ field, formState: { errors } }) => {
                        console.log(field);

                        return (
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            disabled={inactive}
                            label="Danh m???c"
                            {...field}
                            error={!!errors.category}
                          >
                            {CATEGORY.map(({ label, value }) => (
                              <MenuItem value={value}>{label}</MenuItem>
                            ))}
                          </Select>
                        );
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
                        label="Ng??y h???n cu???i"
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
                        label="Gi??? h???n cu???i"
                        value={value}
                        disabled={inactive}
                        onChange={value => {
                          console.log(value);

                          onChange(value);
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
                        label="Ng??y b???t ?????u"
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
                        label="Gi??? b???t ?????u"
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
                        label="Ng??y k???t th??c"
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
                        label="Gi??? k???t th??c"
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
            {project?.status === 'ACTIVE' || project?.status === 'PENDING' ? (
              <div className="text-center mt-8">
                <Button
                  color="error"
                  size="large"
                  variant="outlined"
                  sx={{
                    marginRight: '24px',
                  }}
                  onClick={() => setOpenCancelModal(true)}
                >
                  H???y d??? ??n
                </Button>
                <Button size="large" variant="contained" type="submit">
                  C???p nh???t
                </Button>
              </div>
            ) : project?.status === 'ENDED' ? (
              <div className="text-center text-2xl">D??? ??n ???? k???t th??c</div>
            ) : project?.status === 'EXPIRED' ? (
              <div className="text-center text-2xl">
                D??? ??n ???? h???t th???i gian ????ng k??
              </div>
            ) : (
              <div className="text-center text-2xl">D??? ??n ???? b??? hu???</div>
            )}
          </Box>
        </div>
      </div>
      <Modal
        isOpen={openCancelModal}
        title="X??c nh???n hu??? d??? ??n"
        onClose={() => setOpenCancelModal(false)}
      >
        B???n c?? ch???c ch???n mu???n hu??? ho???t ?????ng n??y kh??ng?
        {/* 
        <div className='my-4'><Checkbox color="secondary" value="1" onClick={(e) => getValue(e)} />Kh??ng ????? s??? l?????ng ng?????i ????ng k?? tham gia</div>
        <div className='my-4'><Checkbox color="secondary" value="2" onClick={(e) => getValue(e)} />Mu???n d???i th???i gian t??nh nguy???n </div>
        <div className='my-4'><Checkbox color="secondary" value="3" onClick={(e) => getValue(e)} />c</div>
        <div className='my-4'><Checkbox color="secondary" value="4" onClick={(e) => getValue(e)} />d</div> */}
        <Box
          component="form"
          onSubmit={handleSubmitCancel(onCancel)}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            fullWidth
            multiline
            label="L?? do hu??? ho???t ?????ng"
            type="text"
            {...registerCancel('reasion')}
            error={!!errorsCancel.reasion}
            helperText={errorsCancel.reasion?.message}
            sx={{
              marginTop: '24px',
            }}
          />
          <div className="my-4">
            <Checkbox color="secondary" value="1" onClick={e => getValue(e)} />{' '}
            ?????ng ?? g???i email th??ng b??o hu??? ?????n nh???ng th??nh vi??n ???? ????ng k?? tham
            gia ho???t ?????ng n??y.
          </div>
          {!reasion && (
            <div className="my-4 text-red-600 text-sm">
              B???n c???n ?????ng ?? g???i email th??ng b??o tr?????c khi x??c nh???n hu???
            </div>
          )}

          <div className="text-center mt-4">
            <Button
              sx={{
                marginRight: '48px',
              }}
              size="large"
              variant="outlined"
              onClick={() => setOpenCancelModal(false)}
            >
              Tr??? v???
            </Button>
            <Button
              color="error"
              size="large"
              variant="contained"
              type="submit"
            >
              Hu??? d??? ??n
            </Button>
            {/* <button className='bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:bg-red-600 rounded mt-6' onClick={onCancel}>
              Hu??? ????ng k??
            </button> */}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateProject;
