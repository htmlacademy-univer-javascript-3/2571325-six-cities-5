import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import PublicRoute from './public-route';
import { AuthorizationStatus } from '../../constants/auth';
import { vi } from 'vitest';
import { createAPI } from '../../api/api';
import thunk from 'redux-thunk';
import { RootState } from '../../store/store';
import { AppThunkDispatch } from '../../store/types';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes } from '../../constants/routers';

describe('PublicRoute', () => {
  const MockComponent = () => <div>Login Page Content</div>;
  const axios = createAPI();
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when not authenticated', () => {
    store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <PublicRoute>
            <MockComponent />
          </PublicRoute>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page Content')).toBeInTheDocument();
  });

  it('redirects to main page when authenticated', () => {
    store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Routes>
            <Route path={AppRoutes.Default} element={<div>Main Page</div>} />
            <Route
              path={AppRoutes.Login}
              element={
                <PublicRoute>
                  <MockComponent />
                </PublicRoute>
              }
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });
});

