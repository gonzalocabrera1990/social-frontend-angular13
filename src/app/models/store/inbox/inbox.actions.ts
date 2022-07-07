import { createAction, props } from '@ngrx/store';
import { Inbox } from '../../inbox.model';

export const inboxAction = createAction('[Inbox] Request');
export const inboxSuccessAction = createAction(
    '[Inbox] Success',
    props<{ inbox: Inbox[]}>()
);
export const inboxErrorAction = createAction(
    '[Inbox] Failed',
    props<{ error: string | null }>()
);