import React from 'react';

interface TabProps {
  cityTitle: string;
  cityIndex: number;
  isActiveCity: boolean;
  handleChangeActiveCityIndex: (index: number) => void;
}

const Tab: React.FC<TabProps> = ({ cityTitle, cityIndex, isActiveCity, handleChangeActiveCityIndex }) => (
  <li
    className="locations__item"
    onClick={() => handleChangeActiveCityIndex(cityIndex)}
  >
    <a className={`locations__item-link tabs__item ${isActiveCity ? 'tabs__item--active' : ''}`} href="#">
      <span>{cityTitle}</span>
    </a>
  </li>
);

export default Tab;
