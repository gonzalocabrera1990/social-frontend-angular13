import { createReducer, on, Action } from '@ngrx/store';
import * as inboxActions from './inbox.actions';
import { InboxState } from './inbox.state';

export const initialInboxState: InboxState = {
    isLoading: false,
    inbox: null,
    errmess: null
};

const inboxReducerInternal = createReducer(
    initialInboxState,
  on(inboxActions.inboxAction, (state) => {
    return {
        ...state,
        inbox: null,
        errmess: '',
        isLoading: true
    };
  }),
  on(inboxActions.inboxSuccessAction, (state , { inbox }) => {
    return {
        ...state,
        inbox: inbox,
        isLoading: false,
        errmess: null
    };
  }),
  on(inboxActions.inboxErrorAction, (state, { error }) => {
    return {
      ...state,
      inbox: null,
      isLoading: false,
      errmess: error
    };
  })
);
export function inboxReducer(state: InboxState | undefined, action: Action) {
  return inboxReducerInternal(state, action);
}
