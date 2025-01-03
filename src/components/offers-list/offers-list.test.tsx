import { render, screen } from '@testing-library/react';
import OffersList from './offers-list';
import { Offer } from '../../types/offer';
import { offersMock } from '../../mocks/offers';

vi.mock('../offer-card/offer-card', () => ({
  default: ({ offer }: { offer: Offer }) => <div data-testid="offer-card">{offer.title}</div>,
}));

describe('OffersList', () => {
  const mockSetOnHoverOfferId = vi.fn();

  it('renders a list of offers', () => {
    render(<OffersList offers={offersMock} setOnHoverOfferId={mockSetOnHoverOfferId} />);

    const listElement = screen.getByTestId('offer-list');
    expect(listElement).toBeInTheDocument();

    const offerCards = screen.getAllByTestId('offer-card');
    expect(offerCards).toHaveLength(offersMock.length);

    offersMock.forEach((offer, index) => {
      expect(offerCards[index]).toHaveTextContent(offer.title);
    });
  });

  it('renders an empty list when no offers are provided', () => {
    render(<OffersList offers={[]} setOnHoverOfferId={mockSetOnHoverOfferId} />);

    const listElement = screen.getByTestId('offer-list');
    expect(listElement).toBeInTheDocument();

    const offerCards = screen.queryAllByTestId('offer-card');
    expect(offerCards).toHaveLength(0);
  });
});
