import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Cities } from '../../../constants/cities';
import { Offer } from '../../../types/offer';
import { AxiosInstance } from 'axios';
import { Actions } from '../../../constants/actions';
import { Paths } from '../../../constants/paths';
import { OfferInfo } from '../../../types/offer-info';
import { OfferNearby } from '../../../types/offer-nearby';

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

export const changeOfferStatus = createAsyncThunk<
    void,
    {
      offerStatus: number;
      offerId: string;
    },
    { extra: AxiosInstance }
  >(
    Actions.CHANGE_OFFER_STATUS,
    async ({ offerStatus, offerId }, { extra: api }) => {
      await api.post(`${Paths.FetchFavoritesOffers}/${offerId}/${offerStatus}`);
    }
  );
