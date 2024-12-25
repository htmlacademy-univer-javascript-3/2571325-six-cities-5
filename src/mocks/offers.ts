import { Offer } from '../types/offer';

export const offersMock: Offer[] = [
  {
    id: 1,
    name: 'Beautiful & luxurious apartment at great location',
    price: 120,
    isPremium: true,
    isFavorite: false,
    rating: 4,
    img: 'apartment-01.jpg',
    type: 'Apartment',
    city: 'Amsterdam',
  },
  {
    id: 2,
    name: 'Wood and stone place',
    price: 80,
    isPremium: false,
    isFavorite: false,
    rating: 4,
    img: 'apartment-02.jpg',
    type: 'Apartment',
    city: 'Amsterdam',
  },
  {
    id: 3,
    name: 'Canal View Prinsengracht',
    price: 132,
    isPremium: false,
    isFavorite: false,
    rating: 4,
    img: 'apartment-03.jpg',
    type: 'Room',
    city: 'Amsterdam',
  },
  {
    id: 4,
    name: 'Nice, cozy, warm big bed apartment',
    price: 180,
    isPremium: true,
    isFavorite: false,
    rating: 5,
    img: 'apartment-small-04.jpg',
    type: 'Apartment',
    city: 'Cologne',
  },
];