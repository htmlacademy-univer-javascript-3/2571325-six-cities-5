import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { Review } from '../../types/review';
import { vi } from 'vitest';
import { commentsMock } from '../../mocks/comments';

vi.mock('../review-item/review-item', () => ({
  default: ({ review }: { review: Review }) => <li data-testid="mocked-review-item">{review.comment}</li>,
}));

describe('ReviewsList', () => {
  it('renders the title with the correct number of reviews', () => {
    render(<ReviewsList reviews={commentsMock} />);

    const titleElement = screen.getByTestId('reviews-list');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders a list of reviews', () => {
    render(<ReviewsList reviews={commentsMock} />);

    const reviewItems = screen.getAllByTestId('mocked-review-item');
    expect(reviewItems).toHaveLength(commentsMock.length);

    commentsMock.forEach((review, index) => {
      expect(reviewItems[index]).toHaveTextContent(review.comment);
    });
  });

  it('renders no reviews when the list is empty', () => {
    render(<ReviewsList reviews={[]} />);

    const titleElement = screen.getByTestId('reviews-list');
    expect(titleElement).toHaveTextContent('Reviews');

    const reviewItems = screen.queryAllByTestId('mocked-review-item');
    expect(reviewItems).toHaveLength(0);
  });
});
