import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffers, fetchFavoritesOffers, fetchOffer, fetchOffersNearby, changeCity, changeOfferStatus } from '../../actions/offers-actions/offers-actions';
import { Cities } from '../../../constants/cities';
import { Offer } from '../../../types/offer';
import { OfferInfo } from '../../../types/offer-info';
import { OfferNearby } from '../../../types/offer-nearby';

interface OffersState {
  offers: Offer[];
  favoritesOffers: Offer[];
  city: Cities;
  offerInfo?: OfferInfo;
  offersNearby?: OfferNearby[];
  isLoading: boolean | undefined;
  error: string | null;
  isUpdate: boolean;
}

const initialState: OffersState = {
  offers: [],
  favoritesOffers: [],
  city: Cities.Paris,
  offerInfo: undefined,
  offersNearby: undefined,
  isLoading: false,
  error: null,
  isUpdate: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeCity, (state, action) => {
        state.city = action.payload;
      })
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load offers';
        state.isLoading = false;
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
      .addCase(fetchOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action: PayloadAction<OfferInfo>) => {
        state.offerInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.isLoading = undefined;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action: PayloadAction<OfferNearby[]>) => {
        state.offersNearby = action.payload;
      })
      .addCase(changeOfferStatus.fulfilled, (state) => {
        state.isUpdate = !state.isUpdate;
      });
  }
});

export const { reducer: offersReducer } = offersSlice;

