import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Actions } from '../../../constants/action';
import { Paths } from '../../../constants/paths';
import { AuthData, UserInfo } from '../../../types/auth';
import { dropToken, saveToken } from '../../../services/services';

export const checkAuthAction = createAsyncThunk<
    UserInfo,
    undefined,
    { extra: AxiosInstance }
  >(
    Actions.CHECK_AUTH,
    async (_, { extra: api }) => {
      const { data } = await api.get<UserInfo>(Paths.FetchLogin);
      return data;
    }
  );

export const loginAction = createAsyncThunk<
    UserInfo,
    AuthData,
    { extra: AxiosInstance }
  >(
    Actions.LOGIN,
    async ({ email, password }, { extra: api }) => {
      const { data } = await api.post<UserInfo>(Paths.FetchLogin, { email, password });
      saveToken(data.token);
      return data;
    }
  );

export const logoutAction = createAsyncThunk<
    void,
    undefined,
    { extra: AxiosInstance }
  >(
    Actions.LOGOUT,
    async (_, { extra: api }) => {
      await api.delete(Paths.FetchLogout);
      dropToken();
    }
  );
