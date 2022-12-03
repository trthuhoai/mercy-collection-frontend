interface IPropsUpdateForm {
  title: string;
  content: string;
  people: number;
  deadline: string | null;
  deadlineTime: string | null;
  startAt: string | null;
  endAt: string | null;
  pictureFile: File[] | string | null;
  startTime: string | null;
  endTime: string | null;
  category: string;
  location: string;
}
interface IProjectDetail {
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
}
export type { IPropsUpdateForm, IProjectDetail };
