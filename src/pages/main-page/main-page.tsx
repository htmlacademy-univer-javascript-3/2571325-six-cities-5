import React, { useEffect, useState, useCallback } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import { Offer } from '../../types/offer';
import { Header } from '../../components/header/header';
import Map from '../../components/map/map';
import Tabs from '../../components/tabs/tabs';
import { Cities } from '../../constants/cities';

interface MainProps {
  offers: Offer [];
  cities: Cities[];
}

const Main: React.FC<MainProps> = (props) => {
  const { offers, cities } = props;
  const [activeCity, setActiveCity] = useState<Cities>(cities[0]);
  const getFilteredOffesList = useCallback(() => offers.filter((offer) => offer.city.title === activeCity.toString()), [offers, activeCity]);
  const [filteredOffersList, setFilteredOffersList] = useState<Offer[]>(getFilteredOffesList());

  useEffect(() => {
    setFilteredOffersList(getFilteredOffesList());
  }, [getFilteredOffesList]);

  return (
    <div className="page page--gray page--main">
      { Header }
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={cities} activeCity={activeCity} setActiveCity={setActiveCity} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${filteredOffersList.length} places to stay in ${activeCity}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList offers={filteredOffersList} />
            </section>
            <div className="cities__right-section">
              <section>
                <Map width={'512px'} height={'100%'} offers={filteredOffersList} activeCityTitle={activeCity} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
