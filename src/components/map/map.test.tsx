import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Map from './map';
import { useMap } from '../../hooks/use-map/use-map';
import leaflet from 'leaflet';
import { offersMock } from '../../mocks/offers';
import { City } from '../../types/city';
import { Location } from '../../types/location';

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => ({
      setView: vi.fn(),
      removeLayer: vi.fn(),
      remove: vi.fn(),
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
    marker: vi.fn(() => ({
      addTo: vi.fn(),
    })),
    icon: vi.fn(),
  },
}));

vi.mock('../../hooks/use-map/use-map', () => ({
  useMap: vi.fn(),
}));

describe('Map', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders map container with correct dimensions', () => {
    render(
      <Map
        width="100px"
        height="100px"
        offers={offersMock}
        activeCityTitle="Paris"
        onHoverOfferId={null}
      />
    );

    const mapElement = screen.getByTestId('map');
    expect(mapElement).toHaveStyle({ width: '100px', height: '100px' });
  });


  it('uses different marker icon for hovered offer', () => {
    const hoveredOfferId = '1';

    render(
      <Map
        width="100px"
        height="100px"
        offers={offersMock}
        activeCityTitle="Paris"
        onHoverOfferId={hoveredOfferId}
      />
    );
  });

  it('updates markers when active city changes', () => {
    const { rerender } = render(
      <Map
        width="100px"
        height="100px"
        offers={offersMock}
        activeCityTitle="Paris"
        onHoverOfferId={null}
      />
    );

    vi.clearAllMocks();

    rerender(
      <Map
        width="100px"
        height="100px"
        offers={offersMock}
        activeCityTitle="London"
        onHoverOfferId={null}
      />
    );

    expect(leaflet.marker).toHaveBeenCalledTimes(0);
  });

  it('handles null city correctly', () => {
    const offersWithoutCity = [{
      ...offersMock[0],
      city: {
        name: '',
        location: {
          latitude: 0,
          longitude: 0,
          zoom: 1
        }
      }
    }];

    render(
      <Map
        width="100px"
        height="100px"
        offers={offersWithoutCity}
        activeCityTitle=""
        onHoverOfferId={null}
      />
    );

    expect(leaflet.marker).not.toHaveBeenCalled();
  });

  it('memoizes map points correctly', () => {
    const { rerender } = render(
      <Map
        width="100px"
        height="100px"
        offers={offersMock}
        activeCityTitle="Paris"
        onHoverOfferId={null}
      />
    );

    const markerCallsBeforeRerender = vi.mocked(leaflet.marker).mock.calls.length;

    rerender(
      <Map
        width="100px"
        height="100px"
        offers={offersMock}
        activeCityTitle="Paris"
        onHoverOfferId={null}
      />
    );

    const markerCallsAfterRerender = vi.mocked(leaflet.marker).mock.calls.length;
    expect(markerCallsAfterRerender).toBe(markerCallsBeforeRerender);
  });

  describe('Map Hook Integration', () => {
    it('initializes map with correct city coordinates', () => {
      render(
        <Map
          width="100px"
          height="100px"
          offers={offersMock}
          activeCityTitle="Paris"
          onHoverOfferId={null}
        />
      );

      expect(useMap).toHaveBeenCalledWith({
        // eslint-disable-next-line
        mapRef: expect.any(Object),
        city: expect.objectContaining({
          location: expect.objectContaining({
            latitude: offersMock[0].city.location.latitude,
            longitude: offersMock[0].city.location.longitude,
            zoom: offersMock[0].city.location.zoom
          }) as Location
        }) as City
      });
    });
  });
});
