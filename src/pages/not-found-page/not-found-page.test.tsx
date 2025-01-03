import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import NotFoundPage from './not-found-page';

describe('NotFound', () => {
  it('render NotFoundPage correctly', () => {
    render(<NotFoundPage />);
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
    expect(screen.getByText('Not Found 404')).toBeInTheDocument();
  });
});
