import axios, { AxiosInstance } from 'axios';

import { getLS } from '@services/localStorageService';

const devURL = 'http://192.168.1.124:8000/api/';
const prodURL = 'https://checklist.pythonanywhere.com/api/';

export const baseURL = import.meta.env.MODE === 'production' ? prodURL : devURL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getLS('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
