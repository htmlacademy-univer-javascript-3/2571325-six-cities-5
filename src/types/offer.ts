import { City } from './city';

export type Offer = {
  id: string;
  title: string;
  price: number;
  isPremium: boolean;
  isFavorite: boolean;
  rating: 1 | 2 | 3 | 4 | 5 ;
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
