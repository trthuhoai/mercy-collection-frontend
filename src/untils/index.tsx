import { FORMAT_DATE } from 'constant';
import { format, formatDistance } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

const getBase64 = file => {
  return new Promise((res, rej) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      res(reader.result);
    };
    reader.onerror = function (error) {
      rej(false);
      console.error('Error: ', error);
    };
  });
};

const convertDate = (date: Date, fm: string = FORMAT_DATE.YEAR_MONTH_DAY) => {
  return format(date, fm);
};

const distanceDateFromNow = (date: string) => {
  const result = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: viLocale,
  });
  return result;
};

export { getBase64, convertDate, distanceDateFromNow };
