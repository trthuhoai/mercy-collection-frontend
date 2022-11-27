import * as yup from 'yup';

const schemaComment = yup.object().shape({
  comment: yup.string().required('Bắt buộc nhập'),
});

export { schemaComment };
