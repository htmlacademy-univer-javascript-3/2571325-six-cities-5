import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SpinnerComponent from '../spinner/spinner';

describe('Spinner', () => {
  it('renders with default height', () => {
    render(<SpinnerComponent />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveStyle({ height: '100vh' });
  });

  it('renders with custom height', () => {
    render(<SpinnerComponent height="50vh" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveStyle({ height: '50vh' });
  });
});
