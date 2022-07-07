import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { OtherUserState } from './otherusers.state';

export const selectOtherUserState = (state: RootState) => state.otherusers;

export const selectIsLoadingOtherusers = createSelector(
    selectOtherUserState,
  (state: OtherUserState) => state.isLoading
);
export const selectOtherusers = createSelector(
  selectOtherUserState,
  (state: OtherUserState) => state.otheruser
);
export const selectErrmessOtherusers = createSelector(
  selectOtherUserState,
  (state: OtherUserState) => state.errmess
);

