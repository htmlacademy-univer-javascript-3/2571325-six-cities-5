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
    city: {
      title: 'Amsterdam',
      coordinates : {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 10,
      }
    }
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
    city: {
      title: 'Amsterdam',
      coordinates : {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 10,
      }
    }
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
    city: {
      title: 'Amsterdam',
      coordinates : {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 10,
      }
    }
  },
  {
    id: 4,
    name: 'Canal View Prinsengracht',
    price: 132,
    isPremium: false,
    isFavorite: false,
    rating: 4,
    img: 'apartment-01.jpg',
    type: 'Apartment',
    city: {
      title: 'Amsterdam',
      coordinates : {
        latitude: 52.3909553943508,
        longitude: 4.829309666406198,
        zoom: 10,
      }
    }
  },
  {
    id: 5,
    name: 'Nice, cozy, warm big bed apartment',
    price: 180,
    isPremium: true,
    isFavorite: false,
    rating: 5,
    img: 'apartment-02.jpg',
    type: 'Apartment',
    city: {
      title: 'Cologne',
      coordinates : {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 10,
      }
    }
  },
];
