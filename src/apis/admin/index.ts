import request from 'apis/axios';
import { ELocalStorageKey } from 'constant/types';

const getMembers = (search?: string) => {
  return request({
    method: 'GET',
    url: `/user/all?search=${search}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const disableUser = id => {
  return request({
    method: 'PATCH',
    url: `/user/disable/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const enableUser = id => {
  return request({
    method: 'PATCH',
    url: `/user/enable/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const authByGoggle = () => {
  return request({
    method: 'POST',
    url: `/auth/register`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const updateUser = data => {
  return request({
    method: 'PATCH',
    url: `/user`,
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const updatePassword = data => {
  return request({
    method: 'PATCH',
    url: `/user/password`,
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const getStatistic = () => {
  return request({
    method: 'GET',
    url: `/projects/statistic`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

export {
  disableUser,
  enableUser,
  getMembers,
  authByGoggle,
  updateUser,
  getStatistic,
  updatePassword,
};
