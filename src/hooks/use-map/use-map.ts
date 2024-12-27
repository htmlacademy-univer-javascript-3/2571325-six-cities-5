import { useEffect, useState, useRef, MutableRefObject } from 'react';
import leaflet, { Map } from 'leaflet';
import { City } from '../../types/city';

interface UseMapProps {
  mapRef: MutableRefObject<HTMLElement | null>;
  city: City | null;
}

export function useMap({ mapRef, city }: UseMapProps): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && city !== null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.coordinates.latitude,
          lng: city.coordinates.longitude,
        },
        zoom: city.coordinates.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  useEffect(() => {
    if (map && city !== null) {
      map.setView(
        {
          lat: city.coordinates.latitude,
          lng: city.coordinates.longitude,
        },
        city.coordinates.zoom
      );
    }
  }, [map, city]);

  return map;
}
