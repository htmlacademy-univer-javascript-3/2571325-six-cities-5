import { Cities } from '../../../constants/cities';
import { changeCity, changeOfferStatus, fetchFavoritesOffers, fetchOffer, fetchOffers, fetchOffersNearby } from '../../actions/offers-actions/offers-actions';
import { offersReducer } from './offers-slice';
import { mockOfferInfo, offersMock } from '../../../mocks/offers';

describe('offersReducer', () => {
  const initialState = {
    offers: [],
    favoritesOffers: [],
    city: Cities.Paris,
    offerInfo: undefined,
    offersNearby: undefined,
    isLoading: false,
    error: null,
    isUpdate: false,
  };

  it('should handle initial state', () => {
    expect(offersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle changeCity', () => {
    const actual = offersReducer(initialState, changeCity(Cities.Amsterdam));
    expect(actual.city).toEqual(Cities.Amsterdam);
  });

  it('should handle fetchOffers.fulfilled', () => {
    const actual = offersReducer(
      { ...initialState, isLoading: true },
      fetchOffers.fulfilled(offersMock, '', Cities.Paris)
    );
    expect(actual.isLoading).toBe(false);
    expect(actual.offers).toEqual(offersMock);
  });

  it('should handle fetchFavoritesOffers.fulfilled', () => {
    const actual = offersReducer(
      { ...initialState, isLoading: true },
      fetchFavoritesOffers.fulfilled(offersMock, '', undefined)
    );
    expect(actual.isLoading).toBe(false);
    expect(actual.favoritesOffers).toEqual(offersMock);
  });

  it('should handle fetchOffer.fulfilled', () => {
    const actual = offersReducer(
      { ...initialState, isLoading: true },
      fetchOffer.fulfilled(mockOfferInfo, '', '1')
    );
    expect(actual.isLoading).toBe(false);
    expect(actual.offerInfo).toEqual(mockOfferInfo);
  });

  it('should handle fetchOffersNearby.fulfilled', () => {
    const actual = offersReducer(
      initialState,
      fetchOffersNearby.fulfilled(offersMock, '', '1')
    );
    expect(actual.offersNearby).toEqual(offersMock);
  });

  it('should handle changeOfferStatus.fulfilled', () => {
    const actual = offersReducer(
      initialState,
      changeOfferStatus.fulfilled(undefined, '', { offerStatus: 1, offerId: '1' })
    );
    expect(actual.isUpdate).toBe(true);
  });

  it('should handle error states', () => {
    const error = 'Error message';
    const actual = offersReducer(
      initialState,
      fetchOffers.rejected(new Error(error), '', Cities.Paris)
    );
    expect(actual.error).toBe(error);
    expect(actual.isLoading).toBe(false);
  });
});
