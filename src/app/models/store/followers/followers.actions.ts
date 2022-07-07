import { createAction, props } from '@ngrx/store';
import { Followers } from '../../followers.model';

export const followersAction = createAction('[Followers] Request');
export const followersSuccessAction = createAction(
    '[Followers] Success',
    props<{ followers: Followers[]}>()
);
export const followersErrorAction = createAction(
    '[Followers] Failed',
    props<{ error: string | null }>()
);