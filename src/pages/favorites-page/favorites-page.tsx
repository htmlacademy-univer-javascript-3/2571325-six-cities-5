import React from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import FavoritesOffersList from '../../components/favorites-offers-list/favorites-offers-list';
import { Header } from '../../components/header/header';
import { AppRoutes } from '../../constants/routers';

interface FavoritesProps {
  offers: Offer[];
}

const FavoritesPage: React.FC<FavoritesProps> = ({ offers }) => {
  const cities = [...new Set(offers.map((offer) => offer.city))];

  return (
    <div className="page">
      { Header }
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                cities.map((city) =>(
                  <li className="favorites__locations-items" key={`${city.title}-items`}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city.title}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {
                        <FavoritesOffersList offers={offers.filter((offer) => offer.city === city)} />
                      }
                    </div>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="header__logo-link" to={AppRoutes.Default}>
          <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

export default FavoritesPage;
