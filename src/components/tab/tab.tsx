import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/routers';

interface TabProps {
  cityTitle: string;
  isActiveCity: boolean;
  handleChangeActiveCity: () => void;
}

const Tab: React.FC<TabProps> = ({ cityTitle, isActiveCity, handleChangeActiveCity }) => (
  <li className="locations__item" data-testid="tab" onClick={handleChangeActiveCity}>
    <Link
      className={`locations__item-link tabs__item ${isActiveCity ? 'tabs__item--active' : ''}`}
      to={AppRoutes.Default}
    >
      <span>{cityTitle}</span>
    </Link>
  </li>
);

export default Tab;
