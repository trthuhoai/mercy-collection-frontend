import request from 'apis/axios';
import { ELocalStorageKey } from 'constant/types';

const getStatistic = () => {
  return request({
    method: 'GET',
    url: `/statistic/projects`,
  });
};

const getProjects = () => {
  return request({
    method: 'GET',
    url: `/projects`,
  });
};

const getCampaignsDetail = (id: string) => {
  return request({
    method: 'GET',
    url: `/campaigns/${id}`,
  });
};

const getProjectsDetail = (id: string) => {
  return request({
    method: 'GET',
    url: `/projects/${id}`,
  });
};

const getMyProjects = () => {
  return request({
    method: 'GET',
    url: `/projects/user`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

export {
  getProjects,
  getStatistic,
  getCampaignsDetail,
  getProjectsDetail,
  getMyProjects,
};
