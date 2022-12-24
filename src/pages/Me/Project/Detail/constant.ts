import * as yup from 'yup';
const headers = [
  {
    name: 'Tên',
  },
  {
    name: 'Email',
  },
  {
    name: 'Số điện thoại',
  },
  {
    name: 'Thời gian đăng ký',
  },
];

const schemaSendMail = yup.object().shape({
  title: yup.string(),
  message: yup.string(),
});

export { headers, schemaSendMail };
