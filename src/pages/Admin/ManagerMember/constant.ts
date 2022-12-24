import * as yup from 'yup';

const REGEX_PHONE = /^0\d{5,15}$/;

const REGEX_PASSWORD =
  // eslint-disable-next-line
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-.:;<=>?@[\\\]^_`{|}~\/])[A-Za-z\d!"#$%&'()*+,-.:;<=>?@[\\\]^_`{|}~\/]{8,20}$/;

const headers = [
  {
    name: '',
  },
  {
    name: 'Họ tên',
  },
  {
    name: 'Email',
  },
  {
    name: 'Tổ chức thành công',
  },
  {
    name: 'Đã tham gia',
  },
  {
    name: 'Phân loại',
  },
  {
    name: 'Chức năng',
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
  people: yup.number().typeError('Phải là số').min(5, 'Nhỏ nhất là 5'),
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

const schemaRegister = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập'),
  email: yup
    .string()
    .required('Bắt buộc nhập')
    .email('Email không đúng định dạng'),
  tel: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(REGEX_PHONE, 'Số điện thoại không đúng định dạng'),
  password: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(
      REGEX_PASSWORD,
      'Mật khẩu bắt buộc 8 đến 20 kí tự và có chữ, số, kí tự đặc biệt',
    ),
  repassword: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(
      REGEX_PASSWORD,
      'Mật khẩu bắt buộc 8 đến 20 kí tự và có chữ, số, kí tự đặc biệt',
    )
    .oneOf([yup.ref('password'), null], 'Nhập lại mật khẩu sai!'),
  gender: yup.string().required('Bắt buộc nhập'),
});

export { headers, defaultValues, schemaCreate, schemaRegister };
