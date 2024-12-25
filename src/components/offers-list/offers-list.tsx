import React from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

interface OffersListProps {
  offers: Offer[];
}

const OffersList: React.FC<OffersListProps> = ({offers}) => offers.map((offer) => (
  <OfferCard key={offer.id} offer={offer} />
));

export default OffersList;
