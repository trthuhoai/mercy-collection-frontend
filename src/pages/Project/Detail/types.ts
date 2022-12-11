import { EStatusProject } from 'constant/types';

export interface IProjectDetail {
  category: string;
  deadline: string;
  deadlineTime: string;
  email: string;
  endAt: string;
  endTime: string;
  id: string;
  location: string;
  memberId: string;
  people: number;
  peopleList: string[];
  pictureUrl: string;
  registered: number;
  startAt: string;
  startTime: string;
  title: string;
  content: string;
  registerStatus: boolean;
  status: string;
  projectId: string;
  reasion: string;
}

export interface ICommentList {
  content: string;
  date: string;
  id: string;
  memberId: string;
  name: string;
  picture: string | null;
  projectId: string;
  rootId: string;
  childrenComment: IChildrenComment[];
}

export interface IChildrenComment {
  content: string;
  date: string;
  id: string;
  memberId: string;
  name: string;
  picture: string | null;
  projectId: string;
  rootId: string;
}

export interface IFormComment {
  comment: string;
}
