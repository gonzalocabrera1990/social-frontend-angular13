import { createReducer, on, Action } from '@ngrx/store';
import * as userActions from './user.actions';
import { UserState } from './user.state';

export const initialUserState: UserState = {
    isLoading: false,
    user: null,
    errmess: null
};

const userReducerInternal = createReducer(
    initialUserState,
  on(userActions.userAction, (state) => {
    return {
        ...state,
        user: null,
        errmess: '',
        isLoading: true
    };
  }),
  on(userActions.userSuccessAction, (state , { user }) => {
    return {
        ...state,
        user: user,
        isLoading: false,
        errmess: null
    };
  }),
  on(userActions.userErrorAction, (state, { error }) => {
    return {
      ...state,
      user: null,
      isLoading: false,
      errmess: error
    };
  })
);
export function userReducer(state: UserState | undefined, action: Action) {
  return userReducerInternal(state, action);
}
