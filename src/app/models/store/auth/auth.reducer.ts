import { createReducer, on, Action } from '@ngrx/store';
import * as authActions from './auth.actions';
import { AuthState } from './auth.state';

export const initialAuthState: AuthState = {
    isLoading: false,
    isAuthenticated: localStorage.getItem("JWT") ? true : false,
    token: localStorage.getItem("JWT"),
    user: null,
    errmess: null,
    id: localStorage.getItem("ID")
};

const authReducerInternal = createReducer(
  initialAuthState,
  on(authActions.loginAction, (state) => {
    return {
        ...state,
        isLoading: true,
        isAuthenticated: false
    };
  }),
  on(authActions.loginSuccessAction, (state , { user }) => {
    return {
        ...state,
        user: user,
        isLoading: false,
        isAuthenticated: true,
        token: '',
        id:''
    };
  }),
  on(authActions.loginErrorAction, (state, { error }) => {
    return {
        ...state,
        user: null,
        errmess: error,
        isLoading: false,
        isAuthenticated: false,
        token: '',
        id:''
    };
  })
);
export function authReducer(state: AuthState | undefined, action: Action) {
  return authReducerInternal(state, action);
}
