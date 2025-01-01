import React, { useCallback } from 'react';
import { Offer, OfferType } from '../../types/offer';
import { OfferNearby } from '../../types/offer-nearby';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/routers';
import { changeOfferStatus } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { selectAuthStatus } from '../../store/selectors/selectors';
import { AuthorizationStatus } from '../../constants/auth';

interface OfferCardProps {
  offer: Offer | OfferNearby;
  cardType?: string;
  setOnHoverOfferId?: (id: string | null) => void;
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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(selectAuthStatus);

  const handleChangeStatus = () => {
    if(authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) {
      navigate(AppRoutes.Login);
      return;
    }
    void (async () => {
      await dispatch(changeOfferStatus({
        offerStatus: offer.isFavorite ? 0 : 1,
        offerId: offer.id
      }));
    })();
  };

  const handleMouseOver = useCallback(() => {
    setOnHoverOfferId?.(offer.id);
  }, [offer.id, setOnHoverOfferId]);

  const handleMouseOut = useCallback(() => {
    setOnHoverOfferId?.(null);
  }, [setOnHoverOfferId]);

  return (
    <article className={`${cardClassName}__card place-card`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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
          <button className="place-card__bookmark-button button" type="button" onClick={handleChangeStatus}>
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
