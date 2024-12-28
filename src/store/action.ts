import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Cities } from '../constants/cities';
import { Offer } from '../types/offer';
import { AxiosInstance } from 'axios';
import { Actions } from '../constants/action';
import { Paths } from '../constants/paths';

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
