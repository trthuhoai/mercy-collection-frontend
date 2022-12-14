import axios, { AxiosRequestConfig } from 'axios';
import { useUser } from 'store';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 60000,
  //   paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
});

const request = async (config: AxiosRequestConfig) => {
  const clearUser = useUser.getState().clearUser;
  const setLocked = useUser.getState().setLocked;

  try {
    const data = await instance(config);
    return data.data;
  } catch (error: any) {
    const errors = error.response.data;
    if (errors.code === 401) {
      localStorage.clear();
      clearUser();
    }
    if (errors.code === 402) {
      localStorage.clear();
      setLocked(true);
    }
    return Promise.reject(errors);
  }
};

export default request;
