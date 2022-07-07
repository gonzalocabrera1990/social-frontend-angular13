import { createReducer, on, Action } from '@ngrx/store';
import * as likesActions from './likes.actions';
import { LikesState } from './likes.state';

export const initialLikesState: LikesState = {
    isLoading: false,
    likes: null,
    errmess: null
};

const likesReducerInternal = createReducer(
    initialLikesState,
  on(likesActions.likesAction, (state) => {
    return {
        ...state,
        likes: null,
        errmess: '',
        isLoading: true
    };
  }),
  on(likesActions.likesSuccessAction, (state , { likes }) => {
    return {
        ...state,
        likes: likes,
        isLoading: false,
        errmess: null
    };
  }),
  on(likesActions.likesErrorAction, (state, { error }) => {
    return {
      ...state,
      likes: null,
      isLoading: false,
      errmess: error
    };
  })
);
export function likesReducer(state: LikesState | undefined, action: Action) {
  return likesReducerInternal(state, action);
}
