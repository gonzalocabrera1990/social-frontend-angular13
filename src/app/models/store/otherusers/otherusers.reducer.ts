import { createReducer, on, Action } from '@ngrx/store';
import * as otheruserActions from './otherusers.actions';
import { OtherUserState } from './otherusers.state';

export const initialOtheruserState: OtherUserState = {
    isLoading: false,
    otheruser: null,
    errmess: null
};

const otheruserReducerInternal = createReducer(
    initialOtheruserState,
  on(otheruserActions.otheruserAction, (state) => {
    return {
        ...state,
        otheruser: null,
        errmess: '',
        isLoading: true
    };
  }),
  on(otheruserActions.otheruserSuccessAction, (state , { otheruser }) => {
    return {
        ...state,
        otheruser: otheruser,
        isLoading: false,
        errmess: null
    };
  }),
  on(otheruserActions.otheruserErrorAction, (state, { error }) => {
    return {
      ...state,
      otheruser: null,
      isLoading: false,
      errmess: error
    };
  })
);
export function otheruserReducer(state: OtherUserState | undefined, action: Action) {
  return otheruserReducerInternal(state, action);
}
