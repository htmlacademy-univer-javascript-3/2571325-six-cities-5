import { TOKEN_STORAGE } from '../constants/token';

export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_STORAGE);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_STORAGE, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_STORAGE);
};
