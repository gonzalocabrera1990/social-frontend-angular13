import { createReducer, on, Action } from '@ngrx/store';
import * as contentActions from './content.actions';
import { ContentState } from './content.state';

export const initialContentState: ContentState = {
    isLoading: false,
    content: null,
    errmess: null
};

const contentReducerInternal = createReducer(
    initialContentState,
  on(contentActions.contentAction, (state) => {
    return {
        ...state,
        content: null,
        errmess: '',
        isLoading: true
    };
  }),
  on(contentActions.contentSuccessAction, (state , { content }) => {
    return {
        ...state,
        content: content,
        isLoading: false,
        errmess: null
    };
  }),
  on(contentActions.contentErrorAction, (state, { error }) => {
    return {
      ...state,
      content: null,
      isLoading: false,
      errmess: error
    };
  })
);
export function contentReducer(state: ContentState | undefined, action: Action) {
  return contentReducerInternal(state, action);
}
