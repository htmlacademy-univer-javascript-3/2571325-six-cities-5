import React, { useCallback } from 'react';
import Tab from '../tab/tab';
import { Cities } from '../../constants/cities';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { selectActiveCity } from '../../store/selectors/selectors';
import { changeCity } from '../../store/actions/offers-actions/offers-actions';

interface TabsProps {
  cities: Cities[];
}

const Tabs: React.FC<TabsProps> = ({ cities }) => {
  const citiesValues = Object.values(cities);
  const dispatch = useDispatch<AppDispatch>();
  const activeCity = useSelector(selectActiveCity);

  const handleChangeActiveCity = useCallback((city: Cities) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            citiesValues.map((city) => (
              <Tab
                key={city}
                cityTitle={city}
                isActiveCity={activeCity === city}
                handleChangeActiveCity={() => handleChangeActiveCity(city)}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
};

export default Tabs;
