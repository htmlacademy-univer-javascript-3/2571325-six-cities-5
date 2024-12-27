import React, { useState, ChangeEvent } from 'react';
import { CommentFormValue } from './types/comment';

interface CommentFormProps {}

const CommentForm: React.FC<CommentFormProps> = () => {
  const [formValue, setFormValue] = useState<CommentFormValue>({
    value: '',
    rating: 0,
  });

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      rating: Number(e.target.value) as CommentFormValue['rating'],
    }));
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue({ ...formValue, value: event.target.value });
  };

  const handleSubmitClick = (e : Event) => {
    e.preventDefault();
  };

  return(
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={formValue.rating === star}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={{ 5: 'perfect', 4: 'good', 3: 'not bad', 2: 'badly', 1: 'terribly' }[star]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={formValue.value} onChange={handleTextChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" onClick={handleSubmitClick}>Submit</button>
      </div>
    </form>
  );
};

export default CommentForm;
