import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Cities } from '../constants/cities';
import { Offer } from '../types/offer';
import { AxiosInstance } from 'axios';
import { Actions } from '../constants/action';
import { Paths } from '../constants/paths';
import { AuthData, UserInfo } from '../types/auth';
import { dropToken, saveToken } from '../services/services';
import { OfferInfo } from '../types/offer-info';
import { OfferNearby } from '../types/offer-nearby';
import { Review } from '../types/review';
import { CommentFormValue } from '../components/comment-form/types/comment';

export const changeCity = createAction<Cities>(Actions.CHANGE_CITY);

export const fetchOffers = createAsyncThunk<
    Offer[],
    Cities,
    { extra: AxiosInstance }
  >(
    Actions.GET_OFFERS,
    async (city, { extra: api }) => {
      const response = await api.get<Offer[]>(Paths.FetchOffers);
      return response.data.filter((offer) => offer.city.name === city.toString());
    }
  );

export const fetchFavoritesOffers = createAsyncThunk<
    Offer[],
    void,
    { extra: AxiosInstance }
  >(
    Actions.GET_FAVORITES_OFFERS,
    async (_, { extra: api }) => {
      const response = await api.get<Offer[]>(Paths.FetchFavoritesOffers);
      return response.data.filter((offer) => offer.isFavorite);
    }
  );

export const fetchOffer = createAsyncThunk<
    OfferInfo,
    string,
    { extra: AxiosInstance }
  >(
    Actions.GET_OFFER,
    async (id, { extra: api }) => {
      const { data } = await api.get<OfferInfo>(Paths.FetchOffer.replace('{offerId}', id));
      return data;
    }
  );

export const fetchOffersNearby = createAsyncThunk<
    OfferNearby[],
    string,
    { extra: AxiosInstance }
  >(
    Actions.GET_OFFERS_NEARBY,
    async (id, { extra: api }) => {
      const { data } = await api.get<OfferNearby[]>(Paths.FetchOfferNearby.replace('{offerId}', id));
      return data;
    }
  );

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

export const fetchComments = createAsyncThunk<
    Review[],
    string,
    { extra: AxiosInstance }
  >(
    Actions.GET_COMMENTS,
    async (id, { extra: api }) => {
      const { data } = await api.get<Review[]>(Paths.FetchComments.replace('{offerId}', id));
      return data;
    }
  );

export const postComment = createAsyncThunk<
    void,
    {
      formValue: CommentFormValue;
      offerId: string;
    },
    { extra: AxiosInstance }
  >(
    Actions.POST_COMMENT,
    async ({ formValue, offerId }, { extra: api }) => {
      await api.post(Paths.FetchComments.replace('{offerId}', offerId), formValue);
    }
  );
