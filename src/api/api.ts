import axios, { AxiosInstance } from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../constants/api';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return api;
};
