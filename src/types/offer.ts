import { City } from './city';

export type Offer = {
  id: string;
  title: string;
  price: number;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  previewImage: string;
  type: string;
  city: City;
}

export enum OfferType {
  Nearby = 'nearby',
  Favorite = 'favorite',
  Defaulte = 'default',
}
