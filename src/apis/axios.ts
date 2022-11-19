import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 60000,
  //   paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
});

const request = async (config: AxiosRequestConfig) => {
  try {
    const data = await instance(config);
    return data.data;
  } catch (error: any) {
    return Promise.reject(error.response.data);
  }
};

export default request;
