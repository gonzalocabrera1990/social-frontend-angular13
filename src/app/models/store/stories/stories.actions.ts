import { createAction, props } from '@ngrx/store';
import { Following } from '../../following.model';

export const storiesAction = createAction('[Stories] Request');
export const storiesSuccessAction = createAction(
    '[Stories] Success',
    props<{ stories: Following[]}>()
);
export const storiesErrorAction = createAction(
    '[Stories] Failed',
    props<{ error: string | null }>()
);