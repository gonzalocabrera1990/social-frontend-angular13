import { createReducer, on, Action } from '@ngrx/store';
import * as followersActions from './followers.actions';
import { FollowersState } from './followers.state';

export const initialFollowersState: FollowersState = {
    isLoading: false,
    followers: null,
    errmess: null
};

const followersReducerInternal = createReducer(
    initialFollowersState,
  on(followersActions.followersAction, (state) => {
    return {
        ...state,
        followers: null,
        errmess: '',
        isLoading: true
    };
  }),
  on(followersActions.followersSuccessAction, (state , { followers }) => {
    return {
        ...state,
        followers: followers,
        isLoading: false,
        errmess: null
    };
  }),
  on(followersActions.followersErrorAction, (state, { error }) => {
    return {
      ...state,
      followers: null,
      isLoading: false,
      errmess: error
    };
  })
);
export function followersReducer(state: FollowersState | undefined, action: Action) {
  return followersReducerInternal(state, action);
}
