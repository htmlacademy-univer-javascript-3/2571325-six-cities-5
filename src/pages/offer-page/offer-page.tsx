import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import CommentForm from '../../components/comment-form/comment-form';
import ReviewList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchComments, fetchOffer, fetchOffersNearby } from '../../store/action';
import { OfferNearby } from '../../types/offer-nearby';
import { OfferInfo } from '../../types/offer-info';
import { AppRoutes } from '../../constants/routers';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { AuthorizationStatus } from '../../constants/auth';

const OfferPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const activeCity = useSelector((state: RootState) => state.city);
  const currOffer = useSelector((state: RootState) => state.offerInfo);
  const currOfferIsLoading = useSelector((state: RootState) => state.offerInfoIsLoading);
  const offersNearby = useSelector((state: RootState) => state.offersNearby);
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const comments = useSelector((state: RootState) => state.commentsInfo);
  const currOfferId = location.pathname.split(':')[1];
  const [offersMap, setOffersMap] = useState<OfferNearby[]>([]);
  const [isUpdateReviews, setIsUpdateReviws] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(currOfferId){
      dispatch(fetchOffer(currOfferId));
      dispatch(fetchOffersNearby(currOfferId));
    }
  }, [dispatch, currOfferId]);

  useEffect(() => {
    if(currOfferId){
      dispatch(fetchComments(currOfferId));
    }
  }, [dispatch, currOfferId, isUpdateReviews]);


  useEffect(() => {
    if(currOfferIsLoading === undefined && currOffer?.id === undefined){
      navigate(AppRoutes.NotFound);
    }
  }, [navigate, currOfferIsLoading, currOffer?.id]);


  const convertOfferToNearby = (data : OfferInfo) => (
    {
      id: data.id,
      title: data.title,
      type: data.type,
      price: data.price,
      previewImage: '',
      city : data.city,
      isFavorite: data.isFavorite,
      isPremium: data.isPremium,
      location: {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        zoom: data.location.zoom,
      },
      rating: data.rating,
      isDefault: true,
    }
  );

  useEffect(() => {
    if(currOffer) {
      const nearbyArr = offersNearby?.slice(0, 3) ?? [];
      setOffersMap([...nearbyArr, convertOfferToNearby(currOffer)]);
    }
  }, [offersNearby, currOffer]);

  return (
    <div className="page">
      <Header />
      {
        !currOfferIsLoading ? (
          <main className="page__main page__main--offer">
            <section className="offer">
              <div className="offer__gallery-container container">
                <div className="offer__gallery">
                  {
                    currOffer?.images && currOffer.images.map((srcImg) => (
                      <div className="offer__image-wrapper" key={srcImg}>
                        <img className="offer__image" src={srcImg} alt="Photo studio"/>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="offer__container container">
                <div className="offer__wrapper">
                  <div className="offer__mark">
                    <span>{currOffer?.isPremium ? 'Premium' : 'No Premium'}</span>
                  </div>
                  <div className="offer__name-wrapper">
                    <h1 className="offer__name">
                      {currOffer?.title ?? 'No Name'}
                    </h1>
                    <button className="offer__bookmark-button button" type="button">
                      <svg className="offer__bookmark-icon" style={ currOffer?.isFavorite ? { fill: '#4481c3', stroke: '#4481c3'} : { fill: 'none'}} width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="offer__rating rating">
                    <div className="offer__stars rating__stars">
                      <span style={{ width: `${(currOffer?.rating ?? 5) * 20}%` }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="offer__rating-value rating__value">4.8</span>
                  </div>
                  <ul className="offer__features">
                    <li className="offer__feature offer__feature--entire">
                      {currOffer?.type ?? 'Not Found'}
                    </li>
                    <li className="offer__feature offer__feature--bedrooms">
                      {currOffer?.bedrooms ?? 1} Bedrooms
                    </li>
                    <li className="offer__feature offer__feature--adults">
                      Max {currOffer?.maxAdults ?? 1} adults
                    </li>
                  </ul>
                  <div className="offer__price">
                    <b className="offer__price-value">&euro;{`${currOffer?.price ?? '-'}`}</b>
                    <span className="offer__price-text">&nbsp;night</span>
                  </div>
                  <div className="offer__inside">
                    <h2 className="offer__inside-title">{currOffer?.title ?? ''}</h2>
                    <ul className="offer__inside-list">
                      {
                        currOffer?.goods
                          ?
                          currOffer?.goods.map((good) => (
                            <li className="offer__inside-item" key={good}>
                              {good}
                            </li>
                          ))
                          :
                          <li className="offer__inside-item">
                            No goods
                          </li>
                      }
                    </ul>
                  </div>
                  <div className="offer__host">
                    <h2 className="offer__host-title">Meet the host</h2>
                    <div className="offer__host-user user">
                      <div
                        className={`offer__avatar-wrapper ${currOffer?.host?.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
                      >
                        <img className="offer__avatar user__avatar" src={currOffer?.host?.avatarUrl} width="74" height="74" alt="Host avatar"/>
                      </div>
                      <span className="offer__user-name">
                        {currOffer?.host?.name}
                      </span>
                      {
                        currOffer?.host?.isPro && (
                          <span className="offer__user-status">
                            Pro
                          </span>
                        )
                      }
                    </div>
                    <div className="offer__description">
                      <p className="offer__text">
                        {currOffer?.description ?? 'No description'}
                      </p>
                    </div>
                  </div>
                  <section className="offer__reviews reviews">
                    <ReviewList reviews={comments ?? []} />
                    {
                      authorizationStatus === AuthorizationStatus.Auth && <CommentForm offerId={currOfferId} setIsUpdateReviws={setIsUpdateReviws} />
                    }
                  </section>
                </div>
              </div>
              <section className="offer__map map" style={{ display: 'flex', justifyContent: 'center'}}>
                <Map width={'1144px'} height={'579px'} offers={offersMap ?? []} onHoverOfferId={currOffer?.id ?? ''} activeCityTitle={currOffer?.city.name ?? activeCity} />
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <NearbyOffersList offers={offersNearby?.slice(0, 3) ?? []} />
              </section>
            </div>
          </main>
        )
          :
          <LoadingScreen />
      }
    </div>
  );
};

export default OfferPage;
