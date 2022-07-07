import { createAction, props } from '@ngrx/store';
import { User } from '../../user.model';

export const loginAction = createAction('[Login] Request');
export const loginSuccessAction = createAction(
    '[Login] Success',
    props<{ user: User }>()
);
export const loginErrorAction = createAction(
    '[Login] Failed',
    props<{ error: Error }>()
);
