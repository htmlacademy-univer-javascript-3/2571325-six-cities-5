import { createReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Cities } from '../constants/cities';
import { fetchOffers, fetchFavoritesOffers, changeCity } from './action';

type OffresListState = {
  offers: Offer[];
  favoritesOffers: Offer[];
  city: Cities;
  isLoading: boolean;
  error: string | null;
};

const initialState: OffresListState = {
  offers: [],
  favoritesOffers: [],
  city: Cities.Paris,
  isLoading: false,
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action: PayloadAction<Cities>) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
      state.isLoading = false;
      state.offers = action.payload;
    })
    .addCase(fetchOffers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Не удалось загрузить предложения';
    })
    .addCase(fetchFavoritesOffers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchFavoritesOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
      state.isLoading = false;
      state.favoritesOffers = action.payload;
    })
    .addCase(fetchFavoritesOffers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Не удалось загрузить избранные предложения';
    });
});
