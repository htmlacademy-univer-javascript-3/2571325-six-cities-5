import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import PrivateRouter from './private-route';
import { AuthorizationStatus } from '../../constants/auth';
import { vi } from 'vitest';
import { createAPI } from '../../api/api';
import thunk from 'redux-thunk';
import { RootState } from '../../store/store';
import { AppThunkDispatch } from '../../store/types';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes } from '../../constants/routers';

describe('PrivateRouter Component', () => {
  const MockComponent = () => <div>Protected Content</div>;
  const axios = createAPI();
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when authenticated', () => {
    store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <PrivateRouter>
            <MockComponent />
          </PrivateRouter>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={
              <PrivateRouter>
                <MockComponent />
              </PrivateRouter>
            }
            />
            <Route path={AppRoutes.Login} element={<div>Login Page</div>} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
