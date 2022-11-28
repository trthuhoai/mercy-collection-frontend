import request from 'apis/axios';
import { ELocalStorageKey } from 'constant/types';

const createComment = (id, content) => {
  return request({
    method: 'POST',
    url: `/comments`,
    data: {
      projectId: id,
      content,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const createReply = (id, rootId, content) => {
  return request({
    method: 'POST',
    url: `/comments/children`,
    data: {
      projectId: id,
      rootId,
      content,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        ELocalStorageKey.ACCESS_TOKEN,
      )}`,
    },
  });
};

const getListComment = id => {
  return request({
    method: 'GET',
    url: `/comments/all/${id}`,
  });
};

export { createComment, getListComment, createReply };
