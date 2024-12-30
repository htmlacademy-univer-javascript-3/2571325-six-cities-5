import React from 'react';
import { OfferType } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { OfferNearby } from '../../types/offer-nearby';


interface NearbyOfferCard {
  offer: OfferNearby;
}

const NearbyOfferCard: React.FC<NearbyOfferCard> = ({offer}) => (
  <OfferCard offer={offer} cardType={OfferType.Nearby} />
);

export default NearbyOfferCard;
