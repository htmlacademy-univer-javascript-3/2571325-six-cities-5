import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import CommentForm from './comment-form';
import { Cities } from '../../constants/cities';
import { AppThunkDispatch } from '../../store/types';
import { RootState } from '../../store/store';
import { createAPI } from '../../api/api';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';

describe('CommentForm', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      offers: {
        city: Cities.Paris
      }
    });
    mockAPI.reset();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('CommentForm rendering and validation', () => {
    const mockSetIsUpdateReviews = vi.fn();
    const offerId = '1';

    const renderCommentForm = () => render(
      <Provider store={store}>
        <CommentForm offerId={offerId} setIsUpdateReviws={mockSetIsUpdateReviews} />
      </Provider>
    );

    it('renders comment form with all elements', () => {
      renderCommentForm();

      expect(screen.getByLabelText('Your review')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('shows alert for missing rating on submit', () => {
      renderCommentForm();

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);

      expect(screen.getByText('Please select a rating before submitting')).toBeInTheDocument();
    });

    it('shows alert for short comment on submit', () => {
      renderCommentForm();

      const ratingInput = screen.getByTestId('perfect');
      fireEvent.click(ratingInput);

      const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
      fireEvent.change(textarea, { target: { value: 'Too short' } });

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);

      expect(screen.getByText('Review text must be at least 50 characters long')).toBeInTheDocument();
    });

    it('shows alert for long comment on submit', () => {
      renderCommentForm();

      const ratingInput = screen.getByTestId('perfect');
      fireEvent.click(ratingInput);

      const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
      const longComment = 'a'.repeat(301);
      fireEvent.change(textarea, { target: { value: longComment } });

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);
      expect(screen.getByText('Review text must not exceed 300 characters')).toBeInTheDocument();
    });
  });
});
