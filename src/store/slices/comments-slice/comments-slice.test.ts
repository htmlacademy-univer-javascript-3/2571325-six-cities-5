import { fetchComments } from '../../actions/comments-actions/comments-actions';
import { commentsReducer } from './comments-slice';
import { commentsMock } from '../../../mocks/comments';


describe('commentsReducer', () => {
  const initialState = {
    comments: [],
    isLoading: false,
  };

  it('should handle initial state', () => {
    expect(commentsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchComments.pending', () => {
    const actual = commentsReducer(initialState, fetchComments.pending('', ''));
    expect(actual.isLoading).toBe(true);
  });

  it('should handle fetchComments.fulfilled', () => {
    const actual = commentsReducer(
      { ...initialState, isLoading: true },
      fetchComments.fulfilled(commentsMock, '', '')
    );
    expect(actual.isLoading).toBe(false);
    expect(actual.comments).toEqual(commentsMock);
  });

  it('should handle fetchComments.rejected', () => {
    const actual = commentsReducer(
      { ...initialState, isLoading: true },
      fetchComments.rejected(null, '', '')
    );
    expect(actual.isLoading).toBeUndefined();
  });
});
