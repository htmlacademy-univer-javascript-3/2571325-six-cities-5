import axios, { AxiosInstance, AxiosError } from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../constants/api';
import { getToken, dropToken } from '../services/services';
import { StatusCodes } from 'http-status-codes';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const { response } = error;
      if (response?.status === StatusCodes.UNAUTHORIZED) {
        dropToken();
      }
      return Promise.reject(error);
    }
  );
  return api;
};
