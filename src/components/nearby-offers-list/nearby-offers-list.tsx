import React from 'react';
import { OfferNearby } from '../../types/offer-nearby';
import NearbyOfferCard from '../nearby-offer-card/nearby-offer-card';

interface NearbyOffersList {
  offers: OfferNearby[];
}

const NearbyOffersList: React.FC<NearbyOffersList> = ({offers}) => (
  <>
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <div className='near-places__list places__list tabs__content'>
      {offers.map((offer) => (
        <NearbyOfferCard key={`${offer.id}`} offer={offer} />
      ))}
    </div>
  </>
);

export default NearbyOffersList;
