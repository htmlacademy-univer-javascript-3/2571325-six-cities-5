import React from 'react';
import { Offer, OfferType } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

interface FavoriteOfferCardProps {
  offer: Offer;
}

const FavoriteOfferCard: React.FC<FavoriteOfferCardProps> = ({offer}) => (
  <OfferCard offer={offer} cardType={OfferType.Favorite} />
);

export default FavoriteOfferCard;
