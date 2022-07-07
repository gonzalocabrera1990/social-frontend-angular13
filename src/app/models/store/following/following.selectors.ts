import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { FollowingState } from './following.state';

export const selectFollowingState = (state: RootState) => state.following;

export const selectIsLoadingFollowing = createSelector(
    selectFollowingState,
  (state: FollowingState) => state.isLoading
);
export const selectFollowing = createSelector(
  selectFollowingState,
  (state: FollowingState) => state.following
);
export const selectErrmessFollowing = createSelector(
  selectFollowingState,
  (state: FollowingState) => state.errmess
);

