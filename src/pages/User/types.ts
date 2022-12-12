enum ETabsUser {
  STATISTIC = 'statistic',
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
  picture: string;
}

interface IUser {
  info: IUserInfo;
  statistic: IStatisticState;
}

export type { IStatisticState, IUser };
export { ETabsUser };
