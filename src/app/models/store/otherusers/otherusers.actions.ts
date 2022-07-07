import { createAction, props } from '@ngrx/store';
import { User } from '../../user.model';

export const otheruserAction = createAction('[Otheruser] Request');
export const otheruserSuccessAction = createAction(
    '[Otheruser] Success',
    props<{ otheruser: User}>()
);
export const otheruserErrorAction = createAction(
    '[Otheruser] Failed',
    props<{ error: string | null }>()
);