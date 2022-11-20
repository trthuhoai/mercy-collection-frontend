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

export { createUser, loginWithUser, getInfoUser };
