import * as yup from 'yup';

const REGEX_PHONE = /^0\d{5,15}$/;

const REGEX_PASSWORD =
  // eslint-disable-next-line
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-.:;<=>?@[\\\]^_`{|}~\/])[A-Za-z\d!"#$%&'()*+,-.:;<=>?@[\\\]^_`{|}~\/]{8,20}$/;

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

const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required('Bắt buộc nhập')
    .email('Email không đúng định dạng'),
  password: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(
      REGEX_PASSWORD,
      'Mật khẩu bắt buộc 8 đến 20 kí tự và có chữ, số, kí tự đặc biệt',
    ),
});

export { schemaRegister, schemaLogin };
