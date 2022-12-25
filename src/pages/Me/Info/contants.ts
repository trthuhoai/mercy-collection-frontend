import * as yup from 'yup';

const REGEX_PHONE = /^0\d{5,15}$/;
const REGEX_PASSWORD =
  // eslint-disable-next-line
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-.:;<=>?@[\\\]^_`{|}~\/])[A-Za-z\d!"#$%&'()*+,-.:;<=>?@[\\\]^_`{|}~\/]{8,20}$/;

const schemaEdit = yup.object().shape(
  {
    name: yup.string().required('Bắt buộc nhập'),
    tel: yup.string().when('tel', val => {
      if (val?.length > 0) {
        return yup
          .string()
          .matches(REGEX_PHONE, 'Số điện thoại không đúng định dạng');
      } else {
        return yup.string();
      }
    }),
    gender: yup.string(),
    address: yup.string(),
    birthday: yup.date().nullable(),
  },
  [['tel', 'tel']],
);

const schemaEditPassword = yup.object().shape({
  // oldPassword: yup
  //   .string()
  //   .matches(
  //     REGEX_PASSWORD,
  //     'Mật khẩu bắt buộc 8 đến 20 kí tự và có chữ, số, kí tự đặc biệt',
  //   ),
  password: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(
      REGEX_PASSWORD,
      'Mật khẩu bắt buộc 8 đến 20 kí tự và có chữ, số, kí tự đặc biệt',
    ),
  reNewPassword: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(
      REGEX_PASSWORD,
      'Mật khẩu bắt buộc 8 đến 20 kí tự và có chữ, số, kí tự đặc biệt',
    )
    .oneOf([yup.ref('password'), null], 'Nhập lại mật khẩu sai!'),
});

export { schemaEdit, schemaEditPassword };
