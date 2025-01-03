import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('LoadingScreen', () => {
  it('renders loading text and spinner', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
