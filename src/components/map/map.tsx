import React, { useRef, useEffect, useState, useCallback } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from '../../hooks/use-map/use-map';
import { Offer } from '../../types/offer';
import { OfferNearby } from '../../types/offer-nearby';
import { Point } from '../../types/point';
import { defaultCustomIcon, currentCustomIcon } from '../../constants/map';

interface MapProps {
  width: string;
  height: string;
  offers: Offer[] | OfferNearby[];
  activeCityTitle: string;
  onHoverOfferId?: string | null;
}

const Map: React.FC<MapProps> = (props) => {
  const { width, height, offers = [], activeCityTitle, onHoverOfferId = null } = props;
  const getPoints = useCallback(
    (offersList: Offer[] | OfferNearby[], onHoverOfferIdItem: string | null) =>
      offersList
        .filter((offer) => offer.city.name === activeCityTitle)
        .map((offer) => ({
          ...offer.location,
          isDefault: offer.id !== onHoverOfferIdItem?.toString(),
        })),
    [activeCityTitle]
  );
  const currCity = offers.find((offer) => offer.city.name === activeCityTitle)?.city || null;
  const [points, setPoints] = useState<Point[]>(getPoints(offers, onHoverOfferId));
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap({ mapRef, city: currCity });

  useEffect(() => {
    setPoints(getPoints(offers, onHoverOfferId));
  }, [onHoverOfferId, activeCityTitle, offers, getPoints]);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: point.isDefault ? defaultCustomIcon : currentCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points]);

  return (
    <div
      style={{ height: height, width: width }}
      ref={mapRef}
    />
  );
};

export default Map;
