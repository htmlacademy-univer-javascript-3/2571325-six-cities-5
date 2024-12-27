import React from 'react';
import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({reviews}) => (
  <>
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length || 0}</span>
    </h2>
    <ul className="reviews__list">
      {
        reviews.map((review) => (
          <ReviewItem review={review} key={review.id} />
        ))
      }
    </ul>
  </>
);

export default ReviewList;
