import { createReducer, on, Action } from '@ngrx/store';
import * as followingActions from './following.actions';
import { FollowingState } from './following.state';

export const initialFollowingState: FollowingState = {
    isLoading: false,
    following: null,
    errmess: null
};

const followingReducerInternal = createReducer(
    initialFollowingState,
  on(followingActions.followingAction, (state) => {
    return {
        ...state,
        following: null,
        errmess: '',
        isLoading: true
    };
  }),
  on(followingActions.followingSuccessAction, (state , { following }) => {
    return {
        ...state,
        following: following,
        isLoading: false,
        errmess: null
    };
  }),
  on(followingActions.followingErrorAction, (state, { error }) => {
    return {
      ...state,
      following: null,
      isLoading: false,
      errmess: error
    };
  })
);
export function followingReducer(state: FollowingState | undefined, action: Action) {
  return followingReducerInternal(state, action);
}
