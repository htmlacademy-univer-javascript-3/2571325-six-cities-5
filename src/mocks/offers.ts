import { Cities } from '../constants/cities';
import { Offer } from '../types/offer';
import { OfferInfo } from '../types/offer-info';
import { OfferNearby } from '../types/offer-nearby';

export const offersMock: Offer[] = [
  {
    id: '4bad02cf-8477-455b-980d-4caa819ab55b',
    title: 'Loft Studio in the Central Area',
    type: 'house',
    price: 328,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
    city: {
      name: Cities.Paris,
      location: {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    location: {
      'latitude': 48.868610000000004,
      'longitude': 2.342499,
      'zoom': 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 2.8
  },
  {
    id: '0f6e0480-867f-4967-80f7-00e9a5b78b69',
    title: 'Wood and stone place',
    type: 'apartment',
    price: 440,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/5.jpg',
    city: {
      name: Cities.Paris,
      location: {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    location: {
      'latitude': 48.858610000000006,
      'longitude': 2.330499,
      'zoom': 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 2.3
  },
];


export const mockOfferInfo : OfferInfo = {
  id: '4bad02cf-8477-455b-980d-4caa819ab55b',
  title: 'Loft Studio in the Central Area',
  type: 'house',
  price: 328,
  city: {
    name: Cities.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16,
  },
  isFavorite: true,
  isPremium: false,
  rating: 2.8,
  description: 'desc',
  bedrooms: 8,
  goods: ['1', '2','Wi-Fi'],
  host: {
    name: 'Artem',
    avatarUrl: 'https://example.com/avatar.jpg',
    isPro: true,
  },
  images: ['', ''],
  maxAdults: 3,
};

export const mockNearbyOffer: OfferNearby = {
  id: '14bad02cf-8477-455b-980d-4caa819ab55',
  title: 'Nearby Apartment',
  type: 'Apartment',
  price: 100,
  city: {
    name: Cities.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16,
  },
  rating: 4.5,
  isFavorite: true,
  isPremium: false,
  previewImage: 'https://example.com/nearby.jpg',
};

export const mockFavoriteOffer: OfferNearby = {
  id: '14bad02cf-8477-455b-980d-4caa819ab55',
  title: 'Favorite House',
  type: 'House',
  price: 300,
  city: {
    name: Cities.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16,
  },
  rating: 4.5,
  isFavorite: true,
  isPremium: false,
  previewImage: 'https://example.com/nearby.jpg',
};
