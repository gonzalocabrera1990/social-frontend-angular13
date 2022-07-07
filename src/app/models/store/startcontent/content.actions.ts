import { createAction, props } from '@ngrx/store';
import { Content } from '../../start-content.model';

export const contentAction = createAction('[Content] Request');
export const contentSuccessAction = createAction(
    '[Content] Success',
    props<{ content: Content[]}>()
);
export const contentErrorAction = createAction(
    '[Content] Failed',
    props<{ error: string | null }>()
);