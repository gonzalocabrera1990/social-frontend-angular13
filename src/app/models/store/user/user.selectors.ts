import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { UserState } from './user.state';

export const selectUserState = (state: RootState) => state.user;

export const selectIsLoadingUser = createSelector(
    selectUserState,
  (state: UserState) => state.isLoading
);
export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);
export const selectErrmessUser = createSelector(
  selectUserState,
  (state: UserState) => state.errmess
);

