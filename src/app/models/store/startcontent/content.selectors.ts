import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { ContentState } from './content.state';

export const selectContentState = (state: RootState) => state.content;

export const selectIsLoadingContent = createSelector(
    selectContentState,
  (state: ContentState) => state.isLoading
);
export const selectContent = createSelector(
  selectContentState,
  (state: ContentState) => state.content
);
export const selectErrmessContent = createSelector(
  selectContentState,
  (state: ContentState) => state.errmess
);

