import { createReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Cities } from '../constants/cities';
import { fetchOffers, fetchFavoritesOffers, changeCity, checkAuthAction, loginAction, logoutAction, fetchOffer, fetchOffersNearby, fetchComments } from './action';
import { AuthorizationStatus } from '../constants/auth';
import { UserInfo } from '../types/auth';
import { OfferInfo } from '../types/offer-info';
import { OfferNearby } from '../types/offer-nearby';
import { Review } from '../types/review';

type OffresListState = {
  offers: Offer[];
  favoritesOffers: Offer[];
  city: Cities;
  isLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo | null;
  offerInfo?: OfferInfo;
  offerInfoIsLoading: boolean | undefined;
  offersNearby?: OfferNearby[];
  commentsInfo?: Review[];
  commentsInfoIsLoading: boolean | undefined;
};

const initialState: OffresListState = {
  offers: [],
  favoritesOffers: [],
  city: Cities.Paris,
  isLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  offerInfo: undefined,
  offerInfoIsLoading: false,
  offersNearby: undefined,
  commentsInfo: undefined,
  commentsInfoIsLoading: false,
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
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userInfo = action.payload;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userInfo = null;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userInfo = action.payload;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userInfo = null;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userInfo = null;
    })
    .addCase(fetchOffer.pending, (state) => {
      state.offerInfoIsLoading = true;
    })
    .addCase(fetchOffer.fulfilled, (state, action: PayloadAction<OfferInfo>) => {
      state.offerInfo = action.payload;
      state.offerInfoIsLoading = false;
    })
    .addCase(fetchOffer.rejected, (state) => {
      state.offerInfoIsLoading = undefined;
    })
    .addCase(fetchOffersNearby.fulfilled, (state, action: PayloadAction<OfferNearby[]>) => {
      state.offersNearby = action.payload;
    })
    .addCase(fetchComments.pending, (state) => {
      state.commentsInfoIsLoading = true;
    })
    .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Review[]>) => {
      state.commentsInfoIsLoading = false;
      state.commentsInfo = action.payload;
    })
    .addCase(fetchComments.rejected, (state) => {
      state.commentsInfoIsLoading = undefined;
    });
});
