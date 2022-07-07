import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { LikesState } from './likes.state';

export const selectLikesState = (state: RootState) => state.likes;

export const selectIsLoadingLikes = createSelector(
    selectLikesState,
  (state: LikesState) => state.isLoading
);
export const selectLikes = createSelector(
  selectLikesState,
  (state: LikesState) => state.likes
);
export const selectErrmessLikes = createSelector(
  selectLikesState,
  (state: LikesState) => state.errmess
);

