import { createAction, props } from '@ngrx/store';
import { User } from '../../user.model';

export const userAction = createAction('[User] Request');
export const userSuccessAction = createAction(
    '[User] Success',
    props<{ user: User}>()
);
export const userErrorAction = createAction(
    '[User] Failed',
    props<{ error: string | null }>()
);