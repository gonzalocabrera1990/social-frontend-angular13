import { createSelector } from '@ngrx/store';
import { RootState } from '../indexStore';
import { StoriesState } from './stories.state';

export const selectStoriesState = (state: RootState) => state.stories;

export const selectIsLoadingStories = createSelector(
    selectStoriesState,
  (state: StoriesState) => state.isLoading
);
export const selectStories = createSelector(
  selectStoriesState,
  (state: StoriesState) => state.stories
);
export const selectErrmessStories = createSelector(
  selectStoriesState,
  (state: StoriesState) => state.errmess
);

