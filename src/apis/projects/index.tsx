import request from 'apis/axios';
import { ELocalStorageKey } from 'constant/types';

const registerProject = id => {
  return request({
    method: 'PATCH',
    url: `/projects/register/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const getCampaigns = () => {
  return request({
    method: 'GET',
    url: `/campaigns`,
  });
};

const getProjects = () => {
  return request({
    method: 'GET',
    url: `/projects`,
  });
};

const getProjectsByStatus = status => {
  return request({
    method: 'GET',
    url: `/projects/${status}`,
  });
};

const getCampaignsByStatus = status => {
  return request({
    method: 'GET',
    url: `/campaigns/${status}`,
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

const getMyProjectsRegister = () => {
  return request({
    method: 'GET',
    url: `/projects/user/registed`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const sendMailProject = id => {
  return request({
    method: 'POST',
    url: `/projects/sendmail/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const getMyCampaigns = () => {
  return request({
    method: 'GET',
    url: `/campaign/user`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const createProject = data => {
  return request({
    method: 'POST',
    url: `/projects`,
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const createCampaign = data => {
  return request({
    method: 'POST',
    url: `/campaigns`,
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};
export {
  getProjects,
  getCampaigns,
  getCampaignsDetail,
  getProjectsDetail,
  getMyProjects,
  registerProject,
  createProject,
  getMyCampaigns,
  createCampaign,
  getMyProjectsRegister,
  sendMailProject,
  getProjectsByStatus,
  getCampaignsByStatus,
};
