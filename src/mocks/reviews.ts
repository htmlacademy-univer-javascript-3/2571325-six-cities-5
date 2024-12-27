import { Review } from '../types/review';
export const reviewsMock: Review[] = [
  {
    id: 1,
    date: '2019-4-26T20:01:13.827Z',
    user: {
      name: 'Max',
      avatarUrl: 'avatar-max.jpg',
      isPro: false,
    },
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century',
    rating: 4
  },
  {
    id: 2,
    date: '2022-2-26T20:01:13.827Z',
    user: {
      name: 'Keks',
      avatarUrl: 'avatar-max.jpg',
      isPro: false,
    },
    text: 'Hello, how are you?',
    rating: 5
  },
];
