import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../constants/auth';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './header';
import { createAPI } from '../../api/api';
import MockAdapter from 'axios-mock-adapter';
import { RootState } from '../../store/store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../../store/types';
import thunk from 'redux-thunk';
import { mockUserInfo } from '../../mocks/user';
import { extractActionsTypes } from '../../store/actions/actions.test';
import { logoutAction } from '../../store/actions/auth-actions/auth-actions';
import { fetchFavoritesOffers } from '../../store/actions/offers-actions/offers-actions';
import { Paths } from '../../constants/paths';

describe('Header', () => {
  const axios = createAPI();
  const mockAPI = new MockAdapter(axios);
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUserInfo,
      },
      offers: {
        favoritesOffers: []
      }
    });
  });

  it('renders authenticated header correctly', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(mockUserInfo.email)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('handles logout', () => {
    mockAPI
      .onDelete(Paths.FetchLogout)
      .reply(200);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Sign out'));

    const actions = store.getActions();
    expect(extractActionsTypes(actions)).toContain(logoutAction.pending.type);
  });

  it('fetches favorites on mount when authenticated', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    const actions = store.getActions();
    expect(extractActionsTypes(actions)).toContain(fetchFavoritesOffers.pending.type);
  });
});
