import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { extractActionsTypes } from '../../store/actions/actions.test';
import CommentForm from './comment-form';
import { Cities } from '../../constants/cities';
import { postComment } from '../../store/actions/comments-actions/comments-actions';
import { AppThunkDispatch } from '../../store/types';
import { RootState } from '../../store/store';
import { createAPI } from '../../api/api';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
  });

  describe('CommentForm ir render', () => {
    const mockSetIsUpdateReviews = vi.fn();
    const offerId = '1';

    beforeEach(() => {
      vi.clearAllMocks();
    });

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

    it('handles form submission with comment and rating', async () => {
      mockAPI
        .onPost(`/comments/${offerId}`)
        .reply(200, []);

      renderCommentForm();

      const ratingInput = screen.getByTestId('perfect');
      fireEvent.click(ratingInput);

      const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
      fireEvent.change(textarea, { target: { value: 'Great place to stay!' } });

      fireEvent.click(screen.getByText('Submit'));

      await waitFor(() => {
        const actions = store.getActions();
        expect(extractActionsTypes(actions)).toEqual([
          postComment.pending.type
        ]);
        expect(mockSetIsUpdateReviews).toHaveBeenCalledTimes(1);
        expect(textarea).toHaveValue('');
      });
    });

    it('handles text input change', () => {
      renderCommentForm();

      const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
      const testComment = 'Great place to stay!';

      fireEvent.change(textarea, { target: { value: testComment } });
      expect(textarea).toHaveValue(testComment);
    });
  });
});
