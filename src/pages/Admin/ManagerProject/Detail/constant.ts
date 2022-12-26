import * as yup from 'yup';

const schemaCancel = yup.object().shape({
  reasion: yup.string().required('Bắt buộc nhập'),
});

export { schemaCancel };
