import React, { useEffect, useState, useCallback } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import { Offer } from '../../types/offer';
import { SortingType } from '../../types/sort';
import { Header } from '../../components/header/header';
import Map from '../../components/map/map';
import Tabs from '../../components/tabs/tabs';
import { Cities } from '../../constants/cities';
import SortingMenu from '../../components/sorting-menu/sorting-menu';

interface MainProps {
  offers: Offer [];
  cities: Cities[];
}

const Main: React.FC<MainProps> = (props) => {
  const { offers, cities } = props;
  const [activeCity, setActiveCity] = useState<Cities>(cities[3]);
  const [isOpenSortingMenu, setIsOpenSortingMenu] = useState<boolean>(false);
  const [sortingType, setSortingType] = useState<SortingType>(SortingType.Popular);
  const [onHoverOfferId, setOnHoverOfferId] = useState<number | null>(null);

  const getFilteredOffersList = useCallback(() => offers.filter((offer) => offer.city.title === activeCity.toString()),
    [offers, activeCity]
  );

  const [filteredOffersList, setFilteredOffersList] = useState<Offer[]>(getFilteredOffersList());

  const sortOffers = useCallback((offersToSort: Offer[]) => {
    switch (sortingType) {
      case SortingType.LowToHight:
        return [...offersToSort].sort((a, b) => a.price - b.price);
      case SortingType.HightToLow:
        return [...offersToSort].sort((a, b) => b.price - a.price);
      case SortingType.TopRating:
        return [...offersToSort].sort((a, b) => b.rating - a.rating);
      default:
        return offersToSort;
    }
  }, [sortingType]);

  useEffect(() => {
    const filtered = getFilteredOffersList();
    const sorted = sortOffers(filtered);
    setFilteredOffersList(sorted);
  }, [sortingType, getFilteredOffersList, sortOffers]);

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
              <SortingMenu
                isOpenSortingMenu={isOpenSortingMenu}
                setIsOpenSortingMenu={setIsOpenSortingMenu}
                sortingType={sortingType}
                setSortingType={setSortingType}
              />
              <OffersList offers={filteredOffersList} setOnHoverOfferId={setOnHoverOfferId} />
            </section>
            <div className="cities__right-section">
              <section>
                <Map width={'512px'} height={'100%'} offers={filteredOffersList} activeCityTitle={activeCity} onHoverOfferId={onHoverOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
