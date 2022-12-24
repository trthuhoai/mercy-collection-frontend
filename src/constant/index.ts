const CATEGORY = [
  {
    label: 'Trẻ em',
    value: 'CHILDREN',
  },
  {
    label: 'Giáo dục',
    value: 'EDUCATION',
  },
  {
    label: 'Y tế',
    value: 'MEDICAL',
  },
  {
    label: 'Thiên tai',
    value: 'CALAMITY',
  },
  {
    label: 'Môi trường',
    value: 'ENVIRONMENT',
  },
];

const FORMAT_DATE = {
  COMMENT: 'dd-MM-yyyy  HH:mm',
  YEAR_MONTH_DAY: 'yyyy-MM-dd',
  HOUR_MINUTE: 'HH:mm',
  FULL_DATE_HOUR: 'yyyy-MM-dd HH:mm',
};

const TABS = [
  {
    label: 'Đang mở đơn',
    value: 'registering',
  },
  {
    label: 'Hết hạn đăng ký',
    value: 'expired',
  },
  {
    label: 'Đã kết thúc',
    value: 'ended',
  },
  {
    label: 'Đã hủy',
    value: 'cancel',
  },
];

export { CATEGORY, FORMAT_DATE, TABS };
