import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { CommentsState } from './comment.state';

export const selectCommentsState = (state: RootState) => state.comments;

export const selectIsLoadingComment = createSelector(
    selectCommentsState,
  (state: CommentsState) => state.isLoading
);
export const selectComment = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.comments
);
export const selectErrmessComment = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.errmess
);

