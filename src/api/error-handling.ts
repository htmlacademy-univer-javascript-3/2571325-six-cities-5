import { AxiosError } from 'axios';

export const isServerError = (error: unknown): error is AxiosError => error instanceof AxiosError && !error.response;

export const handleServerError = (error: unknown) => {
  if (isServerError(error)) {
    // eslint-disable-next-line
    alert('The server is temporarily unavailable. Please try again later.');
  }
  return Promise.reject(error);
};
