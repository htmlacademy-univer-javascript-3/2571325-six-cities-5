import React, { useMemo } from 'react';
import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({reviews}) => {
  const sortedReviews = useMemo(() => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [reviews]);
  return (
    <>
      <h2 className="reviews__title" data-testid='reviews-list'>
        Reviews &middot; <span className="reviews__amount">{reviews.length || 0}</span>
      </h2>
      <ul className="reviews__list">
        {
          sortedReviews.slice(0, 10).map((review) => (
            <ReviewItem review={review} key={review.id} />
          ))
        }
      </ul>
      {
        sortedReviews.length > 10 && (
          <span style={{ marginLeft: '372px', fontSize: '20px'}}>...</span>
        )
      }
    </>
  );
};

export default ReviewsList;
