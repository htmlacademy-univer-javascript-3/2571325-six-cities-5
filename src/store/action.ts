import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Cities } from '../constants/cities';
import { Offer } from '../types/offer';
import { AxiosInstance } from 'axios';
import { Actions } from '../constants/action';
import { Paths } from '../constants/paths';
import { AuthData, UserInfo } from '../types/auth';
import { dropToken, saveToken } from '../services/services';

export const changeCity = createAction<Cities>(Actions.CHANGE_CITY);

export const fetchOffers = createAsyncThunk<
    Offer[],
    Cities,
    { extra: AxiosInstance }
  >(Actions.GET_OFFERS, async (city, { extra: api }) => {
    const response = await api.get<Offer[]>(Paths.FetchOffers);
    return response.data.filter((offer) => offer.city.name === city.toString());
  });

export const fetchFavoritesOffers = createAsyncThunk<
    Offer[],
    void,
    { extra: AxiosInstance }
  >(Actions.GET_FAVORITES_OFFERS, async (_, { extra: api }) => {
    const response = await api.get<Offer[]>(Paths.FetchFavoritesOffers);
    return response.data.filter((offer) => offer.isFavorite);
  });

export const checkAuthAction = createAsyncThunk<
    UserInfo,
    undefined,
    { extra: AxiosInstance }
  >(
    Paths.FetchCheckAuth,
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
    Paths.FetchLogin,
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
    Paths.FetchLogout,
    async (_, { extra: api }) => {
      await api.delete(Paths.FetchLogout);
      dropToken();
    }
  );
