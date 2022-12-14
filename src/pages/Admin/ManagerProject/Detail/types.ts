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
