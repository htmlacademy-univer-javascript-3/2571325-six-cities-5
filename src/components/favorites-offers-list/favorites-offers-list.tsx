import React from 'react';
import FavoriteOfferCard from '../favorite-offer-card/favorite-offer-card';
import { Offer } from '../../types/offer';

interface FavoritesOffersListProps {
  offers: Offer[];
}

const FavoritesOffersList: React.FC<FavoritesOffersListProps> = ({offers}) => offers.map((offer) => (
  <FavoriteOfferCard key={offer.id} offer={offer} />
));

export default FavoritesOffersList;
