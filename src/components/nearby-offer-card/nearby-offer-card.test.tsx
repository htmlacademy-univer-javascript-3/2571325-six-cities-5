import { render, screen } from '@testing-library/react';
import NearbyOfferCard from './nearby-offer-card';
import { Offer, OfferType } from '../../types/offer';
import { mockNearbyOffer } from '../../mocks/offers';
import { vi } from 'vitest';
import { OfferNearby } from '../../types/offer-nearby';

describe('NearbyOfferCard', () => {
  vi.mock('../offer-card/offer-card', () => ({
    default: ({ offer, cardType }: { offer: Offer | OfferNearby; cardType: OfferType }) => (
      <div data-testid="mocked-offer-card">
        {offer.title} - {cardType}
      </div>
    ),
  }));

  it('renders a nearby offer card with the correct type', () => {
    render(<NearbyOfferCard offer={mockNearbyOffer} />);

    const offerCard = screen.getByTestId('mocked-offer-card');
    expect(offerCard).toHaveTextContent(mockNearbyOffer.title);
    expect(offerCard).toHaveTextContent(OfferType.Nearby);
  });
});
