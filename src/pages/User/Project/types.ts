interface IPropsCreateForm {
  title: string;
  contend: string;
  people: number;
  deadline: string | null;
  deadlineTime: string | null;
  startAt: string | null;
  endAt: string | null;
  pictureFile: File[] | null;
  startTime: string | null;
  endTime: string | null;
  category: string;
  location: string;
}

export type { IPropsCreateForm };
