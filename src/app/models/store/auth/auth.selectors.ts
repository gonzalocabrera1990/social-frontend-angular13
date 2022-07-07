import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { AuthState } from './auth.state';

export const selectAuthState = (state: RootState) => state.auth;

export const selectIsLoadingAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);
export const selectUserAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
export const selectErrmessAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state.errmess
);

export const selectIsAuthenticatedAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
export const selectTokenAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);
export const selectIdAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state.id
);
