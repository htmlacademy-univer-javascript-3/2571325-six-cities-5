import React from 'react';
import { Offer, OfferType } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

interface NearbyOfferCard {
  offer: Offer;
}

const NearbyOfferCard: React.FC<NearbyOfferCard> = ({offer}) => (
  <OfferCard offer={offer} cardType={OfferType.Nearby} />
);

export default NearbyOfferCard;
