import { RootState } from '../store';

export const selectOffers = (state: RootState) => state.offers.offers;
export const selectActiveCity = (state: RootState) => state.offers.city;
export const selectOffersLoading = (state: RootState) => state.offers.isLoading;
export const selectOffersNearby = (state: RootState) => state.offers.offersNearby;
export const selectOfferInfo = (state: RootState) => state.offers.offerInfo;
export const selectOfferIsLoading = (state: RootState) => state.offers.isLoading;
export const selectIsUpdateOffers = (state: RootState) => state.offers.isUpdate;
export const selectFavoritesOffers = (state: RootState) => state.offers.favoritesOffers;
export const selectAuthStatus = (state: RootState) => state.auth.authorizationStatus;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;
export const selectComments = (state: RootState) => state.comments.comments;
