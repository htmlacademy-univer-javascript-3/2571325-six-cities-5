import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Actions } from '../../../constants/actions';
import { Paths } from '../../../constants/paths';
import { Review } from '../../../types/review';
import { CommentFormValue } from '../../../components/comment-form/types/comment';

export const fetchComments = createAsyncThunk<
    Review[],
    string,
    { extra: AxiosInstance }
  >(
    Actions.GET_COMMENTS,
    async (id, { extra: api }) => {
      const { data } = await api.get<Review[]>(Paths.FetchComments.replace('{offerId}', id));
      return data;
    }
  );

export const postComment = createAsyncThunk<
    void,
    {
      formValue: CommentFormValue;
      offerId: string;
    },
    { extra: AxiosInstance }
  >(
    Actions.POST_COMMENT,
    async ({ formValue, offerId }, { extra: api }) => {
      await api.post(Paths.FetchComments.replace('{offerId}', offerId), formValue);
    }
  );
