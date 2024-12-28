import React from 'react';

interface TabProps {
  cityTitle: string;
  isActiveCity: boolean;
  handleChangeActiveCity: () => void;
}

const Tab: React.FC<TabProps> = ({ cityTitle, isActiveCity, handleChangeActiveCity }) => (
  <li className="locations__item" onClick={handleChangeActiveCity}>
    <a
      className={`locations__item-link tabs__item ${isActiveCity ? 'tabs__item--active' : ''}`}
      href="#"
    >
      <span>{cityTitle}</span>
    </a>
  </li>
);

export default Tab;
