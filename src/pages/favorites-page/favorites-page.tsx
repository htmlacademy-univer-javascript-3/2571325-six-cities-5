import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import FavoritesOffersList from '../../components/favorites-offers-list/favorites-offers-list';
import Header from '../../components/header/header';
import { AppRoutes } from '../../constants/routers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchFavoritesOffers } from '../../store/action';

interface FavoritesProps {}

const FavoritesPage: React.FC<FavoritesProps> = () => {
  const favoritesOffers = useSelector((state: RootState) => state.favoritesOffers);
  const cities = [...new Set(favoritesOffers.map((offer) => offer.city.name))];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFavoritesOffers());
  }, [dispatch]);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {
              favoritesOffers.length > 0 ?
                (
                  <ul className="favorites__list">
                    {
                      cities.map((city) =>(
                        <li className="favorites__locations-items" key={`${city}`}>
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <a className="locations__item-link" href="#">
                                <span>{city}</span>
                              </a>
                            </div>
                          </div>
                          <div className="favorites__places">
                            {
                              <FavoritesOffersList offers={favoritesOffers.filter((offer) => offer.city.name === city)} />
                            }
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                )
                :
                <span style={{ display: 'flex', justifyContent: 'center', fontSize: '18px', fontWeight: '500' }}>Nothing yet saved</span>
            }

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
