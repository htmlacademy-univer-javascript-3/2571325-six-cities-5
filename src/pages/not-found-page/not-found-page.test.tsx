import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import NotFoundPage from './not-found-page';

describe('NotFound', () => {
  it('render NotFoundPage correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
    expect(screen.getByText('Not Found 404')).toBeInTheDocument();
  });
});
