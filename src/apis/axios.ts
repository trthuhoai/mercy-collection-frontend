import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 60000,
  //   paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
});

const request = async (config: AxiosRequestConfig) => {
  try {
    const data = await instance(config);
    return data;
  } catch (error) {
    return error;
  }
};

export default request;
