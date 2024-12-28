import { createReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Cities } from '../constants/cities';
import { getOffers, getFavoritesOffers, changeCity } from './action';
import { offersMock } from '../mocks/offers';

type OffresListState = {
  offers: Offer[];
  favoritesOffers: Offer[];
  city: string;
};

const initialState: OffresListState = {
  offers: [],
  favoritesOffers: [],
  city: Cities.Paris,
};

export const reducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(getOffers, (state, action: PayloadAction<Cities>) => {
        state.offers = offersMock.filter((offer) => offer.city.title === action.payload.toString());
      })
      .addCase(getFavoritesOffers, (state) => {
        state.favoritesOffers = offersMock.filter((offer) => offer.isFavorite);
      })
      .addCase(changeCity, (state, action: PayloadAction<Cities>) => {
        state.city = action.payload;
      });
  }
);
