import { EStatusProject } from 'constant/types';

export interface IMemberDetail {
  id: string;
  picture: string;
  name: string;
  email: string;
  permission: string;
  registeredProject: number;
  successProject: number;
  disableUser: boolean;
  createdAt: string;
}
