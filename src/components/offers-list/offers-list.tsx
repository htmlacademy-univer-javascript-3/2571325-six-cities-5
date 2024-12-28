import React from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer, OfferType } from '../../types/offer';

interface OffersListProps {
  offers: Offer[];
}

const OffersList: React.FC<OffersListProps> = ({ offers }) => (
  <div className='cities__places-list places__list tabs__content'>
    {offers.map((offer) => (
      <OfferCard key={`${offer.id}`} offer={offer} cardType={OfferType.Defaulte} />
    ))}
  </div>
);
export default OffersList;
