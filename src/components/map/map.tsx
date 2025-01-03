import React, { useRef, useEffect, useMemo } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from '../../hooks/use-map/use-map';
import { Offer } from '../../types/offer';
import { OfferNearby } from '../../types/offer-nearby';
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
  const currCity = useMemo(() =>
    offers.find((offer) => offer.city.name === activeCityTitle)?.city || null,
  [offers, activeCityTitle]
  );

  const points = useMemo(() =>
    offers
      .filter((offer) => offer.city.name === activeCityTitle)
      .map((offer) => ({
        ...offer.location,
        isDefault: offer.id !== onHoverOfferId?.toString(),
      })),
  [offers, activeCityTitle, onHoverOfferId]);

  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap({ mapRef, city: currCity });

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
      data-testid="map"
    />
  );
};

const MemoizedMap = React.memo(Map);
export default MemoizedMap;
