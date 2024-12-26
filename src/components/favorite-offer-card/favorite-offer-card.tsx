import React from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoutes } from '../../constants/routers';

interface FavoriteOfferCardProps {
  offer: Offer;
}

const FavoriteOfferCard: React.FC<FavoriteOfferCardProps> = ({offer}) => (
  <article className="favorites__card place-card">
    {offer.isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div className="favorites__image-wrapper place-card__image-wrapper">
      <Link to={`${AppRoutes.Offer}/:${offer.id}`}>
        <img
          className="place-card__image"
          src={`img/${offer.img}`}
          width="150"
          height="110"
          alt={offer.name}
        />
      </Link>
    </div>
    <div className="favorites__card-info place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">
            &euro;{offer.price}
          </b>
          <span className="place-card__price-text"> &#47;&nbsp;night</span>
        </div>
        <button
          className="place-card__bookmark-button place-card__bookmark-button--active button"
          type="button"
        >
          <svg
            className="place-card__bookmark-icon"
            width="18"
            height="19"
          >
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">
            In bookmarks
          </span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{offer.name}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>
);

export default FavoriteOfferCard;
