import React from 'react';
import Tab from '../tab/tab';
import { Cities } from '../../constants/cities';

interface TabsProps {
  cities: Cities[];
  activeCity: Cities;
  setActiveCity: (city: Cities) => void;
}

const Tabs: React.FC<TabsProps> = ({ cities, activeCity, setActiveCity }) => {
  const citiesValues = Object.values(cities);
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
                handleChangeActiveCity={() => setActiveCity(city)}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
};

export default Tabs;
