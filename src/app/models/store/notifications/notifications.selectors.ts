import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { NotificationsState } from './notifications.state';

export const selectNotificationsState = (state: RootState) => state.notifications;

export const selectIsLoadingNotifications = createSelector(
    selectNotificationsState,
  (state: NotificationsState) => state.isLoading
);
export const selectNotifications = createSelector(
  selectNotificationsState,
  (state: NotificationsState) => state.notifications
);
export const selectErrmessNotifications = createSelector(
  selectNotificationsState,
  (state: NotificationsState) => state.errmess
);

