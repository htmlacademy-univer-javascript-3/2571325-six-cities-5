import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cities } from '../../../constants/cities';
import { AppRoutes } from '../../../constants/routers';
import PrivateRouter from '../../private-route/private-route';
import MainPage from '../../../pages/main-page/main-page';
import LoginPage from '../../../pages/login-page/login-page';
import FavoritesPage from '../../../pages/favorites-page/favorites-page';
import OfferPage from '../../../pages/offer-page/offer-page';
import NotFound from '../../../pages/not-found-page/not-found-page';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { checkAuthAction } from '../../../store/actions/auth-actions/auth-actions';
import PublicRoute from '../../public-route/public-route';

const Router: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Default} element={<MainPage cities={Object.values(Cities)} />} />
        <Route
          path={AppRoutes.Login}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path={AppRoutes.Favorites} element={(
          <PrivateRouter>
            <FavoritesPage />
          </PrivateRouter>
        )}
        />
        <Route path={AppRoutes.OfferId} element={<OfferPage />} />
        <Route path={AppRoutes.NotFound} element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
