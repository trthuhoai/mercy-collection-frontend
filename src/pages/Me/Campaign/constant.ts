import * as yup from 'yup';

const headers = [
  {
    name: 'Tiêu đề',
  },
  {
    name: 'Mục tiêu',
  },
  {
    name: 'Đã ủng hộ',
  },
  {
    name: 'Thể loại',
  },
  {
    name: 'Hạn đăng ký',
  },
  {
    name: 'Thời gian bắt đầu',
  },
  {
    name: 'Thời gian kết thúc',
  },
  {
    name: 'Địa điểm',
  },
];

const defaultValues = {
  title: '',
  content: '',
  deadline: null,
  deadlineTime: null,
  startAt: null,
  endAt: null,
  startTime: null,
  endTime: null,
  location: '',
  pictureFile: null,
};

const schemaCreate = yup.object().shape({
  title: yup.string().required('Bắt buộc nhập'),
  content: yup.string().required('Bắt buộc nhập'),
  goal: yup.number().typeError('Phải là số').min(500000, 'Nhỏ nhất là 500000'),
  deadline: yup
    .date()
    .typeError('Bắt buộc chọn ngày')
    .max(yup.ref('startAt'), 'Phải nhỏ hơn ngày bắt đầu'),
  deadlineTime: yup.date().typeError('Bắt buộc chọn giờ'),
  startAt: yup
    .date()
    .typeError('Bắt buộc chọn ngày')
    .min(new Date(), 'Phải lớn hơn hoặc bằng hôm nay'),
  endAt: yup
    .date()
    .typeError('Bắt buộc chọn ngày')
    .min(yup.ref('startAt'), 'Phải lớn hơn ngày bắt đầu'),
  pictureFile: yup.mixed().required('Bắt buộc nhập'),
  startTime: yup.date().typeError('Bắt buộc chọn giờ'),
  endTime: yup.date().typeError('Bắt buộc chọn giờ'),
  category: yup.string().required('Bắt buộc nhập'),
  location: yup.string().required('Bắt buộc nhập'),
});

export { headers, defaultValues, schemaCreate };
