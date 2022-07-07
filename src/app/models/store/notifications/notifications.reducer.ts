import { createReducer, on, Action } from '@ngrx/store';
import * as notificationsActions from './notifications.actions';
import { NotificationsState } from './notifications.state';

export const initialNotificationsState: NotificationsState = {
    isLoading: false,
    notifications: null,
    errmess: null
};

const notificationsReducerInternal = createReducer(
    initialNotificationsState,
  on(notificationsActions.notificationsAction, (state) => {
    return {
        ...state,
        notifications: null,
        errmess: '',
        isLoading: true
    };
  }),
  on(notificationsActions.notificationsSuccessAction, (state , { notifications }) => {
    return {
        ...state,
        notifications: notifications,
        isLoading: false,
        errmess: null
    };
  }),
  on(notificationsActions.notificationsErrorAction, (state, { error }) => {
    return {
      ...state,
      notifications: null,
      isLoading: false,
      errmess: error
    };
  })
);
export function notificationsReducer(state: NotificationsState | undefined, action: Action) {
  return notificationsReducerInternal(state, action);
}
