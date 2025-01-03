import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { mockReview } from '../../mocks/comments';

describe('ReviewItem', () => {
  it('renders review information correctly', () => {
    render(<ReviewItem review={mockReview} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Great place')).toBeInTheDocument();
    expect(screen.getByText('December 2024')).toBeInTheDocument();
    expect(screen.getByText('December 2024')).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute('src', 'test-avatar.jpg');
    expect(screen.getByTestId('review-item')).toBeInTheDocument();
  });
});
