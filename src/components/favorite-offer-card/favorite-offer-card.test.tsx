import { render, screen } from '@testing-library/react';
import FavoriteOfferCard from './favorite-offer-card';
import { Offer, OfferType } from '../../types/offer';
import { mockFavoriteOffer } from '../../mocks/offers';
import { OfferNearby } from '../../types/offer-nearby';

vi.mock('../offer-card/offer-card', () => ({
  default: ({ offer, cardType }: { offer: Offer | OfferNearby; cardType: OfferType }) => (
    <div data-testid='mocked-offer-card'>
      {offer.title} - {cardType}
    </div>
  ),
}));

describe('FavoriteOfferCard', () => {
  it('renders a favorite offer card with the correct type', () => {
    render(<FavoriteOfferCard offer={mockFavoriteOffer} />);

    const offerCard = screen.getByTestId('mocked-offer-card');
    expect(offerCard).toHaveTextContent('Favorite House');
    expect(offerCard).toHaveTextContent(OfferType.Favorite);
  });
});
