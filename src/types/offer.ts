import { City } from './city';

export type Offer = {
  id: number;
  name: string;
  price: number;
  isPremium: boolean;
  isFavorite: boolean;
  rating: 1 | 2 | 3 | 4 | 5 ;
  img: string;
  type: 'Apartment' | 'Room';
  city: City;
};
