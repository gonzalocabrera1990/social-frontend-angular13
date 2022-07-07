import { createAction, props } from '@ngrx/store';
import { Notifications } from '../../notifications.model';

export const notificationsAction = createAction('[Notifications] Request');
export const notificationsSuccessAction = createAction(
    '[Notifications] Success',
    props<{ notifications: Notifications[]}>()
);
export const notificationsErrorAction = createAction(
    '[Notifications] Failed',
    props<{ error: string | null }>()
);