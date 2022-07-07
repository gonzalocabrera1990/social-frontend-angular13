import { createAction, props } from '@ngrx/store';
import { Likes } from '../../likes.model';

export const likesAction = createAction('[Likes] Request');
export const likesSuccessAction = createAction(
    '[Likes] Success',
    props<{ likes: Likes}>()
);
export const likesErrorAction = createAction(
    '[Likes] Failed',
    props<{ error: string | null }>()
);