import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../constants/routers';
import PrivateRouter from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import { Offer } from '../../types/offer';

const USER_STATUS_AUTHENTICATED = true;

interface AppProps {
  offers: Offer[];
}

const App: React.FC<AppProps> = ({ offers }) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.Default} element={<MainPage offersCount={offers.length} offers={offers} />} />
      <Route path={AppRoutes.Login} element={<LoginPage />} />
      <Route path={AppRoutes.Favorites} element={(
        <PrivateRouter isAuthenticated={USER_STATUS_AUTHENTICATED}>
          <FavoritesPage offers={offers} />
        </PrivateRouter>
      )}
      />
      <Route path={AppRoutes.OfferId} element={<OfferPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
