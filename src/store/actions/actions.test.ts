import { createAPI } from '../../api/api';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../types';
import { RootState } from '../store';
import { offersMock } from '../../mocks/offers';
import { commentsMock } from '../../mocks/comments';
import { Paths } from '../../constants/paths';
import { Cities } from '../../constants/cities';
import { Actions } from '../../constants/actions';
import { CommentFormValue } from '../../types/comment';
import { mockUserInfo } from '../../mocks/user';
import { checkAuthAction, loginAction, logoutAction } from './auth-actions/auth-actions';
import { changeOfferStatus, fetchFavoritesOffers, fetchOffer, fetchOffers } from './offers-actions/offers-actions';
import { fetchComments, postComment } from './comments-actions/comments-actions';

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

describe('Asycn actoins', () => {
  const axios = createAPI();
  const mockAPI = new MockAdapter(axios);
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    mockAPI.reset();
  });

  describe('fetchOffers', () => {
    it('should dispatch "fetchOffers.pending" and "fetchOffers.fulfilled" on success', async () => {
      const mockOffers = offersMock;
      mockAPI.onGet(Paths.FetchOffers).reply(200, mockOffers);

      await store.dispatch(fetchOffers(Cities.Paris));
      const actions = extractActionsTypes(store.getActions());
      const fetchData = store.getActions().at(1) as ReturnType<typeof fetchOffers.fulfilled>;

      expect(actions).toEqual([
        `${Actions.GET_OFFERS}/pending`,
        `${Actions.GET_OFFERS}/fulfilled`
      ]);

      expect(fetchData.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffers.rejected" on failure', async () => {
      mockAPI.onGet(Paths.FetchOffers).reply(404);

      await store.dispatch(fetchOffers(Cities.Paris));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.GET_OFFERS}/pending`,
        `${Actions.GET_OFFERS}/rejected`
      ]);
    });
  });

  describe('fetchOffer', () => {
    const mockOfferId = '4bad02cf-8477-455b-980d-4caa819ab55b';

    it('should dispatch "fetchOffer.pending" and "fetchOffer.fulfilled" on success', async () => {
      mockAPI.onGet(Paths.FetchOffer.replace('{offerId}', mockOfferId)).reply(200, offersMock);

      await store.dispatch(fetchOffer(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.GET_OFFER}/pending`,
        `${Actions.GET_OFFER}/fulfilled`
      ]);
      const fetchData = store.getActions().at(1) as ReturnType<typeof fetchOffer.fulfilled>;
      expect(fetchData.payload).toEqual(offersMock);
    });

    it('should dispatch "fetchOffer.pending" and "fetchOffer.rejected" on failure', async () => {
      mockAPI.onGet(Paths.FetchOffer.replace('{offerId}', mockOfferId)).reply(404);

      await store.dispatch(fetchOffer(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.GET_OFFER}/pending`,
        `${Actions.GET_OFFER}/rejected`
      ]);
      const fetchData = store.getActions().at(1) as ReturnType<typeof fetchOffer.rejected>;
      expect(fetchData?.payload).toBe(undefined);
    });
  });

  describe('fetchFavoritesOffers', () => {
    it('should dispatch "fetchFavoritesOffers.pending" and "fetchFavoritesOffers.fulfilled" on success', async () => {
      const mockOffers = offersMock;
      mockAPI.onGet(Paths.FetchFavoritesOffers).reply(200, mockOffers);

      await store.dispatch(fetchFavoritesOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.GET_FAVORITES_OFFERS}/pending`,
        `${Actions.GET_FAVORITES_OFFERS}/fulfilled`
      ]);

      const fetchData = store.getActions().at(1) as ReturnType<typeof fetchFavoritesOffers.fulfilled>;
      expect(fetchData?.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchFavoritesOffers.pending" and "fetchFavoritesOffers.rejected" on failure', async () => {
      mockAPI.onGet(Paths.FetchFavoritesOffers).reply(401);

      await store.dispatch(fetchFavoritesOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.GET_FAVORITES_OFFERS}/pending`,
        `${Actions.GET_FAVORITES_OFFERS}/rejected`
      ]);

      const fetchData = store.getActions().at(1) as ReturnType<typeof fetchFavoritesOffers.rejected>;
      expect(fetchData?.payload).toBe(undefined);
    });
  });

  describe('changeOfferStatus', () => {
    it('should dispatch "changeOfferStatus.pending" and "changeOfferStatus.fulfilled" on success', async () => {
      const mockOfferId = '4bad02cf-8477-455b-980d-4caa819ab55b';
      const mockOfferStatus = 1;

      mockAPI.onPost(`${Paths.FetchFavoritesOffers}/${mockOfferId}/${mockOfferStatus}`).reply(200);
      await store.dispatch(changeOfferStatus({ offerId: mockOfferId, offerStatus: mockOfferStatus }));

      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        `${Actions.CHANGE_OFFER_STATUS}/pending`,
        `${Actions.CHANGE_OFFER_STATUS}/fulfilled`
      ]);
    });

    it('should dispatch "changeOfferStatus.rejected" on failure', async () => {
      const mockOfferId = '4bad02cf-8477-455b-980d-4caa819ab55b';
      const mockOfferStatus = 1;

      mockAPI.onPost(`${Paths.FetchFavoritesOffers}/${mockOfferId}/${mockOfferStatus}`).reply(500);
      await store.dispatch(changeOfferStatus({ offerId: mockOfferId, offerStatus: mockOfferStatus }));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.CHANGE_OFFER_STATUS}/pending`,
        `${Actions.CHANGE_OFFER_STATUS}/rejected`
      ]);
    });
  });

  describe('fetchComments', () => {
    const mockOfferId = '4bad02cf-8477-455b-980d-4caa819ab55b';

    it('should dispatch "fetchComments.pending" and "fetchComments.fulfilled" on success', async () => {
      const mockComment = commentsMock;
      mockAPI.onGet(Paths.FetchComments.replace('{offerId}', mockOfferId)).reply(200, mockComment);

      await store.dispatch(fetchComments(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.GET_COMMENTS}/pending`,
        `${Actions.GET_COMMENTS}/fulfilled`
      ]);

      const fetchData = store.getActions().at(1) as ReturnType<typeof fetchComments.fulfilled>;
      expect(fetchData?.payload).toEqual(mockComment);
    });

    it('should dispatch "fetchComments.pending" and "fetchComments.rejected" on failure', async () => {
      mockAPI.onGet(Paths.FetchComments.replace('{offerId}', mockOfferId)).reply(404);

      await store.dispatch(fetchComments(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.GET_COMMENTS}/pending`,
        `${Actions.GET_COMMENTS}/rejected`
      ]);

      const fetchData = store.getActions().at(1) as ReturnType<typeof fetchComments.rejected>;
      expect(fetchData?.payload).toBe(undefined);
    });
  });

  describe('postComment', () => {
    const mockOfferId = 'e71c2f87-5550-4453-b9af-fc192ee5d4e4';
    const mockCommentData = {
      formValue: {
        comment: 'Test comment',
        rating: 5
      } as CommentFormValue,
      offerId: mockOfferId as string
    };

    it('should dispatch "postComment.pending" and "postComment.fulfilled" on success', async () => {
      mockAPI.onPost(Paths.FetchComments.replace('{offerId}', mockOfferId)).reply(200);

      await store.dispatch(postComment(mockCommentData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.POST_COMMENT}/pending`,
        `${Actions.POST_COMMENT}/fulfilled`
      ]);
    });

    it('should dispatch "postComment.pending" and "postComment.rejected" on failure', async () => {
      mockAPI.onPost(Paths.FetchComments.replace('{offerId}', mockOfferId)).reply(400);

      await store.dispatch(postComment(mockCommentData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.POST_COMMENT}/pending`,
        `${Actions.POST_COMMENT}/rejected`
      ]);
      const fetchData = store.getActions().at(1) as ReturnType<typeof postComment.rejected>;
      expect(fetchData?.payload).toBe(undefined);
    });
  });

  describe('loginAction', () => {
    const mockCredentials = {
      email: 'Oliver.conner@gmail.com',
      password: 'password1',
    };

    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" on success', async () => {
      mockAPI.onPost(Paths.FetchLogin).reply(200, mockUserInfo);

      await store.dispatch(loginAction(mockCredentials));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.LOGIN}/pending`,
        `${Actions.LOGIN}/fulfilled`
      ]);

      const fetchData = store.getActions().at(1) as ReturnType<typeof loginAction.fulfilled>;
      expect(fetchData?.payload).toEqual(mockUserInfo);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" on failure', async () => {
      mockAPI.onPost(Paths.FetchLogin).reply(400);

      await store.dispatch(loginAction(mockCredentials));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.LOGIN}/pending`,
        `${Actions.LOGIN}/rejected`
      ]);
      const fetchData = store.getActions().at(1) as ReturnType<typeof loginAction.rejected>;
      expect(fetchData?.payload).toEqual(undefined);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" on success', async () => {
      mockAPI.onDelete(Paths.FetchLogout).reply(200);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.LOGOUT}/pending`,
        `${Actions.LOGOUT}/fulfilled`
      ]);
    });

    it('should dispatch "logoutAction.pending" and "logoutAction.rejected" on failure', async () => {
      mockAPI.onDelete(Paths.FetchLogout).reply(500);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.LOGOUT}/pending`,
        `${Actions.LOGOUT}/rejected`
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" on success', async () => {
      mockAPI.onGet(Paths.FetchLogin).reply(200, mockUserInfo);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.CHECK_AUTH}/pending`,
        `${Actions.CHECK_AUTH}/fulfilled`
      ]);

    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" on failure', async () => {
      mockAPI.onGet(Paths.FetchLogin).reply(401);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        `${Actions.CHECK_AUTH}/pending`,
        `${Actions.CHECK_AUTH}/rejected`
      ]);
    });
  });
});
