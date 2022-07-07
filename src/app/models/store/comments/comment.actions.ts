import { createAction, props } from '@ngrx/store';
import { Comment } from '../../comment.model';

export const commentsAction = createAction('[Comments] Request');
export const commentsSuccessAction = createAction(
    '[Comments] Success',
    props<{ comments: Comment[]}>()
);
export const commentsErrorAction = createAction(
    '[Comments] Failed',
    props<{ error: string | null }>()
);