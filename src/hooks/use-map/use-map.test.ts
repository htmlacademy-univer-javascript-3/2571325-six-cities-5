import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMap } from './use-map';
import leaflet from 'leaflet';
import { mockCity } from '../../mocks/city';

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => ({
      setView: vi.fn(),
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
  },
}));

describe('useMap', () => {
  const mockMapRef = {
    current: document.createElement('div')
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create map instance when mapRef and city are provided', () => {
    const { result } = renderHook(() => useMap({
      mapRef: mockMapRef,
      city: mockCity
    }));

    expect(leaflet.map).toHaveBeenCalledWith(mockMapRef.current, {
      center: {
        lat: mockCity.location.latitude,
        lng: mockCity.location.longitude,
      },
      zoom: mockCity.location.zoom,
    });
    expect(result.current).not.toBeNull();
  });

  it('should not create map instance when city is null', () => {
    const { result } = renderHook(() => useMap({
      mapRef: mockMapRef,
      city: null
    }));

    expect(leaflet.map).not.toHaveBeenCalled();
    expect(result.current).toBeNull();
  });
});
