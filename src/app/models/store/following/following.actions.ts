import { createAction, props } from '@ngrx/store';
import { Following } from '../../following.model';

export const followingAction = createAction('[Following] Request');
export const followingSuccessAction = createAction(
    '[Following] Success',
    props<{ following: Following[]}>()
);
export const followingErrorAction = createAction(
    '[Following] Failed',
    props<{ error: string | null }>()
);