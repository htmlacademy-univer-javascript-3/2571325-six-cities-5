import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/routers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logoutAction } from '../../store/action';
import { AuthorizationStatus } from '../../constants/auth';

const Header: React.FC = () => {
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const favoritesOffers = useSelector((state: RootState) => state.favoritesOffers);
  const dispatch = useDispatch<AppDispatch>();

  const fetchLogout = async () => await dispatch(logoutAction()).unwrap();

  const handleLogout = () => {
    fetchLogout();
  };

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
