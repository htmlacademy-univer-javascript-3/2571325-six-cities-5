import axios, { AxiosInstance, AxiosError, AxiosHeaders } from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../constants/api';
import { getToken, dropToken } from '../services/services';
import { StatusCodes } from 'http-status-codes';
import { handleServerError } from './error-handling';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    if (!config.headers) {
      config.headers = {} as AxiosHeaders;
    }

    if (token) {
      config.headers['X-Token'] = token;
    }

    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
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
      return handleServerError(error);
    }
  );
  return api;
};
