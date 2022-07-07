import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { InboxState } from './inbox.state';

export const selectInboxState = (state: RootState) => state.inbox;

export const selectIsLoadingInbox = createSelector(
    selectInboxState,
  (state: InboxState) => state.isLoading
);
export const selectInbox = createSelector(
  selectInboxState,
  (state: InboxState) => state.inbox
);
export const selectErrmessInbox = createSelector(
  selectInboxState,
  (state: InboxState) => state.errmess
);

