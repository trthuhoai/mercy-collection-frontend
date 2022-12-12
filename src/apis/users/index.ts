import request from 'apis/axios';
import { ELocalStorageKey } from 'constant/types';

const createUser = body => {
  return request({
    method: 'POST',
    url: `/user/register`,
    data: body,
  });
};

const loginWithUser = body => {
  return request({
    method: 'POST',
    url: `/user/login`,
    data: body,
  });
};

const getInfoUser = () => {
  return request({
    method: 'GET',
    url: `/user`,
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
  createUser,
  loginWithUser,
  getInfoUser,
  authByGoggle,
  updateUser,
  getStatistic,
  updatePassword
};
