import React from 'react';
import { Offer, OfferType } from '../../types/offer';
import { OfferNearby } from '../../types/offer-nearby';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/routers';

interface OfferCardProps {
  offer: Offer | OfferNearby;
  cardType?: string;
  setOnHoverOfferId?: React.Dispatch<React.SetStateAction<string | null>>;
}

enum ClassName {
  Nearby = 'near-places',
  Favorite = 'favorites',
  Default = 'cities',
}

const OfferCard: React.FC<OfferCardProps> = (props) => {
  const {offer, cardType = OfferType.Defaulte, setOnHoverOfferId} = props;
  const getClassName = (type : string) => {
    switch(type){
      case OfferType.Nearby:
        return ClassName.Nearby;
      case OfferType.Favorite:
        return ClassName.Favorite;
      default:
        return ClassName.Default;
    }
  };
  const cardClassName = getClassName(cardType);
  const handleIsHoverOffer = () =>{
    if(setOnHoverOfferId) {
      setOnHoverOfferId(offer.id);
    }
  };

  const handleOutHoverOffer = () =>{
    if(setOnHoverOfferId) {
      setOnHoverOfferId(null);
    }
  };

  return (
    <article className={`${cardClassName}__card place-card`} onMouseOver={handleIsHoverOffer} onMouseOut={handleOutHoverOffer}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardClassName}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoutes.Offer}/:${offer.id}`}>
          <img
            className="place-card__image"
            src={`${offer.previewImage}`}
            width={cardClassName !== ClassName.Favorite ? '260px' : '150px'}
            height={cardClassName !== ClassName.Favorite ? '200px' : '200px'}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text"> &#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19" style={offer.isFavorite ? { fill: '#4481c3', stroke: '#4481c3'} : { fill: 'none'}}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Offer}/:${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default OfferCard;
