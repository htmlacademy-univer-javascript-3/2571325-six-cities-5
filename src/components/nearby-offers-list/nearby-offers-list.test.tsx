import { render, screen } from '@testing-library/react';
import NearbyOffersList from './nearby-offers-list';
import { OfferNearby } from '../../types/offer-nearby';
import { vi } from 'vitest';
import { offersMock } from '../../mocks/offers';

vi.mock('../nearby-offer-card/nearby-offer-card', () => ({
  default: ({ offer }: { offer: OfferNearby }) => <div data-testid="mocked-nearby-offer-card">{offer.title}</div>,
}));

describe('NearbyOffersList', () => {

  it('renders the title for the list of nearby offers', () => {
    render(<NearbyOffersList offers={offersMock} />);

    const titleElement = screen.getByText('Other places in the neighbourhood');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders a list of nearby offers', () => {
    render(<NearbyOffersList offers={offersMock} />);

    const nearbyOfferCards = screen.getAllByTestId('mocked-nearby-offer-card');
    expect(nearbyOfferCards).toHaveLength(offersMock.length);

    offersMock.forEach((offer, index) => {
      expect(nearbyOfferCards[index]).toHaveTextContent(offer.title);
    });
  });

  it('renders no offers when the list is empty', () => {
    render(<NearbyOffersList offers={[]} />);

    const nearbyOfferCards = screen.queryAllByTestId('mocked-nearby-offer-card');
    expect(nearbyOfferCards).toHaveLength(0);
  });
});
