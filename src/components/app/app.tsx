import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../constants/routers';
import PrivateRouter from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { Cities } from '../../constants/cities';

const USER_STATUS_AUTHENTICATED = true;

interface AppProps {
  offers: Offer[];
  reviews: Review[];
  cities: Cities[];
}

const App: React.FC<AppProps> = ({ offers, reviews, cities }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Default} element={<MainPage offers={offers} cities={cities} />} />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route path={AppRoutes.Favorites} element={(
          <PrivateRouter isAuthenticated={USER_STATUS_AUTHENTICATED}>
            <FavoritesPage offers={offers} />
          </PrivateRouter>
        )}
        />
        <Route path={AppRoutes.OfferId} element={<OfferPage reviews={reviews} offers={offers} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
