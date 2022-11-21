import request from 'apis/axios';

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

export { getProjects, getCampaigns, getCampaignsDetail, getProjectsDetail };
