import React from 'react';
import Tab from '../tab/tab';
import { Cities } from '../../constants/cities';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { changeCity } from '../../store/action';
import { RootState } from '../../store';

interface TabsProps {
  cities: Cities[];
}

const Tabs: React.FC<TabsProps> = ({ cities }) => {
  const citiesValues = Object.values(cities);
  const dispatch = useDispatch<AppDispatch>();
  const activeCity = useSelector((state: RootState) => state.city);

  const handleChangeActiveCity = (city: Cities) => {
    dispatch(changeCity(city));
  };

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
