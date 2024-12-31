import React from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer, OfferType } from '../../types/offer';

interface OffersListProps {
  offers: Offer[];
  setOnHoverOfferId: (id: string | null) => void;
}

const OffersList: React.FC<OffersListProps> = ({ offers, setOnHoverOfferId }) => (
  <div className='cities__places-list places__list tabs__content'>
    {offers.map((offer) => (
      <OfferCard key={`${offer.id}`} offer={offer} cardType={OfferType.Defaulte} setOnHoverOfferId={setOnHoverOfferId} />
    ))}
  </div>
);

export default OffersList;
