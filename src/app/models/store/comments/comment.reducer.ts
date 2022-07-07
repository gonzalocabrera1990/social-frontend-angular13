import { createReducer, on, Action } from '@ngrx/store';
import * as commentActions from './comment.actions';
import { CommentsState } from './comment.state';

export const initialCommentState: CommentsState = {
    isLoading: false,
    comments: null,
    errmess: null
};

const commentReducerInternal = createReducer(
    initialCommentState,
  on(commentActions.commentsAction, (state) => {
    return {
        ...state,
        comments: null,
        errmess: '',
        isLoading: true
    };
  }),
  on(commentActions.commentsSuccessAction, (state , { comments }) => {
    return {
        ...state,
        comments: comments,
        isLoading: false,
        errmess: null
    };
  }),
  on(commentActions.commentsErrorAction, (state, { error }) => {
    return {
      ...state,
      comments: null,
      isLoading: false,
      errmess: error
    };
  })
);
export function commentReducer(state: CommentsState | undefined, action: Action) {
  return commentReducerInternal(state, action);
}
