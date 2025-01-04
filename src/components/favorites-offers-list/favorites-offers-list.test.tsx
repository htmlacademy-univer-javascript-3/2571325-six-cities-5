import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FavoritesOffersList from './favorites-offers-list';
import { Offer } from '../../types/offer';
import { offersMock } from '../../mocks/offers';

vi.mock('../favorite-offer-card/favorite-offer-card', () => ({
  default: ({ offer }: { offer: Offer }) => (
    <div data-testid="mocked-favorite-offer-card">{offer.title}</div>
  ),
}));

describe('FavoritesOffersList', () => {
  it('renders the correct number of favorite offer cards', () => {
    render(<FavoritesOffersList offers={offersMock} />);

    const favoriteOfferCards = screen.getAllByTestId('mocked-favorite-offer-card');
    expect(favoriteOfferCards).toHaveLength(offersMock.length);

    offersMock.forEach((offer, index) => {
      expect(favoriteOfferCards[index]).toHaveTextContent(offer.title);
    });
  });
});
