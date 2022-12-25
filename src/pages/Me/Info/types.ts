interface IFormEditProps {
  name: string;
  tel: string;
  gender: string;
  address: string;
  birthday: Date | null;
  telShow: boolean;
  genderShow: boolean;
  nameShow: boolean;
  addressShow: boolean;
  birthdayShow: boolean;
}

interface IFormEditPasswordProps {
  oldPassword: string | null;
  password: string;
  reNewPassword: string;
}

enum ETabsInfo {
  CHANGE_INFO = 'info',
  CHANGE_PASSWORD = 'password',
  STATISTIC = 'statistic',
}

interface IStatisticState {
  numberProjects: number;
  numberRegistered: number;
  successProject: number;
}

export type { IFormEditProps, IFormEditPasswordProps, IStatisticState };
export { ETabsInfo };
