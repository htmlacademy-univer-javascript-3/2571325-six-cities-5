import React from 'react';
import { Cities } from '../../constants/cities';

interface OffersPlugProps {
  activeCity: Cities;
}

const OffersPlug: React.FC<OffersPlugProps> = ({ activeCity }) => (
  <div className="cities" data-testid='offers-plug'>
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  </div>
);

export default OffersPlug;
