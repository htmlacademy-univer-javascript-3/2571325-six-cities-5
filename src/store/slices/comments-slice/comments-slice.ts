import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../../types/review';
import { fetchComments } from '../../actions/comments-actions/comments-actions';

interface CommentsState {
  comments: Review[];
  isLoading: boolean | undefined;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = undefined;
      });
  }
});

export const { reducer: commentsReducer } = commentsSlice;
