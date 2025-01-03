import { render, screen } from '@testing-library/react';
import { Cities } from '../../constants/cities';
import OffersPlug from './offers-plug';

describe('OffersPlug', () => {
  it('renders correct city name and messages', () => {
    render(<OffersPlug activeCity={Cities.Paris} />);
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByTestId('offers-plug')).toBeInTheDocument();
  });
});
