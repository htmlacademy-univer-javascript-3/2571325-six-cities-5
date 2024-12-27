import React, { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from '../../hooks/use-map/use-map';
import { Offer } from '../../types/offer';
import { defaultCustomIcon } from '../../constants/map';

interface MapProps {
  width: string;
  height: string;
  offers: Offer[];
  activeCityTitle: string;
}

const Map: React.FC<MapProps> = ({ width, height, offers, activeCityTitle }) => {
  const currCity = offers.find((offer) => offer.city.title === activeCityTitle)?.city || null;
  const points = offers.filter((offer) => offer.city.title === activeCityTitle).map((offer) => offer.city.coordinates);
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
            icon: defaultCustomIcon,
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
