import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Router from './router';
import { AppRoutes } from '../../../constants/routers';
import { authReducer } from '../../../store/slices/auth-slice/auth-slice';

vi.mock('../../../pages/main-page/main-page', () => ({
  default: () => <div>MainPage</div>
}));

vi.mock('../../../pages/login-page/login-page', () => ({
  default: () => <div>LoginPage</div>
}));

vi.mock('../../../pages/favorites-page/favorites-page', () => ({
  default: () => <div>FavoritesPage</div>
}));

vi.mock('../../../pages/offer-page/offer-page', () => ({
  default: () => <div>OfferPage</div>
}));

vi.mock('../../../pages/not-found-page/not-found-page', () => ({
  default: () => <div>NotFound</div>
}));

vi.mock('../../private-route/private-route', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>PrivateRouter{children}</div>
}));

const mockStore = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const renderWithProviders = (initialRoute = '/') => {
  window.history.pushState({}, '', initialRoute);

  return render(
    <Provider store={mockStore}>
      <Router />
    </Provider>
  );
};

describe('Router tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(`should render MainPage on ${AppRoutes.Default} route`, () => {
    renderWithProviders(AppRoutes.Default);
    expect(screen.getByText('MainPage')).toBeInTheDocument();
  });

  it(`should render LoginPage on ${AppRoutes.Login} route`, () => {
    renderWithProviders(AppRoutes.Login);
    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it(`should render FavoritesPage wrapped in PrivateRouter on ${AppRoutes.Favorites} route`, () => {
    renderWithProviders(AppRoutes.Favorites);
    expect(screen.getByText('PrivateRouter')).toBeInTheDocument();
    expect(screen.getByText('FavoritesPage')).toBeInTheDocument();
  });

  it(`should render OfferPage on ${AppRoutes.OfferId} route`, () => {
    renderWithProviders(AppRoutes.OfferId.replace('id', '123'));
    expect(screen.getByText('OfferPage')).toBeInTheDocument();
  });

  it('should render NotFound on invalid routes', () => {
    renderWithProviders('/12357qwer');
    expect(screen.getByText('NotFound')).toBeInTheDocument();
  });

  it(`should render NotFound on explicit ${AppRoutes.NotFound} route`, () => {
    renderWithProviders(AppRoutes.NotFound);
    expect(screen.getByText('NotFound')).toBeInTheDocument();
  });
});
