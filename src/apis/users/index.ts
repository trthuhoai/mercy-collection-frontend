import request from 'apis/axios';

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

export { createUser, loginWithUser };
