enum ETabsUser {
  STATISTIC = 'statistic',
  INFO = 'info',
}

interface IStatisticState {
  numberProjects: number;
  numberRegistered: number;
  successProject: number;
}

interface IUserInfo {
  cover: string;
  email: string;
  id: string;
  name: string;
  gender: string;
  birthday: string;
  tel: string;
  address: string;
  picture: string;
  nameShow: boolean;
  genderShow: boolean;
  addressShow: boolean;
  birthdayShow: boolean;
  telShow: boolean;
}

interface IUser {
  info: IUserInfo;
  statistic: IStatisticState;
}

export type { IStatisticState, IUser, IUserInfo };
export { ETabsUser };
