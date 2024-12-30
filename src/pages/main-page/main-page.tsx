import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import { SortingType } from '../../types/sort';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import Tabs from '../../components/tabs/tabs';
import { Cities } from '../../constants/cities';
import SortingMenu from '../../components/sorting-menu/sorting-menu';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOffers } from '../../store/action';
import { AppDispatch } from '../../store/store';
import Spinner from '../../components/spinner/spinner';
import { selectActiveCity, selectOffers, selectOffersLoading } from '../../store/selectors/selectors';

interface MainProps {
  cities: Cities[];
}

const Main: React.FC<MainProps> = (props) => {
  const { cities } = props;
  const [isOpenSortingMenu, setIsOpenSortingMenu] = useState<boolean>(false);
  const [sortingType, setSortingType] = useState<SortingType>(SortingType.Popular);
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const offers = useSelector(selectOffers);
  const activeCity = useSelector(selectActiveCity);
  const isLoading = useSelector(selectOffersLoading);

  useEffect(() => {
    dispatch(fetchOffers(activeCity));
  }, [dispatch, activeCity]);

  const sortedOffers = useMemo(() => {
    switch (sortingType) {
      case SortingType.LowToHight:
        return [...offers].sort((a, b) => a.price - b.price);
      case SortingType.HightToLow:
        return [...offers].sort((a, b) => b.price - a.price);
      case SortingType.TopRating:
        return [...offers].sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }, [offers, sortingType]);

  const handleSortingChange = useCallback((type: SortingType) => {
    setSortingType(type);
  }, []);

  const handleHoverChange = useCallback((id: string | null) => {
    setHoveredOfferId(id);
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={cities} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${sortedOffers.length} places to stay in ${activeCity}`}</b>
              <SortingMenu
                isOpen={isOpenSortingMenu}
                onToggle={setIsOpenSortingMenu}
                sortingType={sortingType}
                onTypeChange={handleSortingChange}
              />
              {isLoading ? (
                <Spinner />
              ) : (
                <OffersList
                  offers={sortedOffers}
                  setOnHoverOfferId={handleHoverChange}
                />
              )}
            </section>
            <div className="cities__right-section">
              <section>
                <Map
                  width={'512px'}
                  height={'100%'}
                  offers={sortedOffers}
                  activeCityTitle={activeCity}
                  onHoverOfferId={hoveredOfferId}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
const MemoizedMain = memo(Main);

export default MemoizedMain;
