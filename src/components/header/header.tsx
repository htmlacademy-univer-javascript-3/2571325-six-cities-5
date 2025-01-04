import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/routers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { AuthorizationStatus } from '../../constants/auth';
import { selectAuthStatus, selectFavoritesOffers, selectIsUpdateOffers, selectUserInfo } from '../../store/selectors/selectors';
import { fetchFavoritesOffers } from '../../store/actions/offers-actions/offers-actions';
import { logoutAction } from '../../store/actions/auth-actions/auth-actions';

const Header: React.FC = () => {
  const authorizationStatus = useSelector(selectAuthStatus);
  const userInfo = useSelector(selectUserInfo);
  const favoritesOffers = useSelector(selectFavoritesOffers);
  const dispatch = useDispatch<AppDispatch>();
  const isUpdateData = useSelector(selectIsUpdateOffers);

  const fetchLogout = async () => await dispatch(logoutAction()).unwrap();

  const handleLogout = () => {
    void (async () => {
      await fetchLogout();
    })();
  };

  useEffect(() => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesOffers());
    }
  }, [dispatch, authorizationStatus, isUpdateData]);

  const authNav = (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">{userInfo?.email}</span>
            <span className="header__favorite-count">{favoritesOffers.length}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <span className="header__signout" onClick={handleLogout} style={{ cursor: 'pointer' }}>Sign out</span>
        </li>
      </ul>
    </nav>
  );

  const unknownNav = (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Login}>
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoutes.Default}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {
            authorizationStatus === AuthorizationStatus.Auth ? authNav : unknownNav
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
