import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { FollowersState } from './followers.state';

export const selectFollowersState = (state: RootState) => state.followers;

export const selectIsLoadingFollowers = createSelector(
    selectFollowersState,
  (state: FollowersState) => state.isLoading
);
export const selectFollowers = createSelector(
  selectFollowersState,
  (state: FollowersState) => state.followers
);
export const selectErrmessFollowers = createSelector(
  selectFollowersState,
  (state: FollowersState) => state.errmess
);

