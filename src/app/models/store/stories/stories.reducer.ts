import { createReducer, on, Action } from '@ngrx/store';
import * as storiesActions from './stories.actions';
import { StoriesState } from './stories.state';
import { measure } from '../../../services/helpers/libs';

export const initialStoriesState: StoriesState = {
    isLoading: false,
    stories: null,
    errmess: null
};

const storiesReducerInternal = createReducer(
    initialStoriesState,
  on(storiesActions.storiesAction, (state) => {
    return {
        ...state,
        stories: null,
        errmess: '',
        isLoading: true
    };
  }),
  on(storiesActions.storiesSuccessAction, (state , { stories }) => {
    let storageId = localStorage.getItem('ID')
            
            
    let filtrador = stories
    
    let nss = filtrador.filter(us=> us.id.stories[0] && us.id.stories.find(h => measure(h.timestamp) <= 100000 && !h.views.some(v => v === storageId)));
    let ss = filtrador.filter(us=> us.id.stories[0] && us.id.stories.every(h => measure(h.timestamp) <= 100000 && h.views.some(v => v === storageId)));

  let measureNoSeenStory = !nss ? null : nss.map(u=>u.id.stories.filter(s=> measure(s.timestamp) <= 100000))
  let filterMeasureNoSeenStory = measureNoSeenStory!.filter(n => n.length > 0)
  let measureSeenStory = !ss ? null : ss.map(u=>u.id.stories.filter(s=> measure(s.timestamp) <= 100000))
  let filterMeasureSeenStory = measureSeenStory!.filter(n => n.length > 0)
  const storyStore = {
    users: {
      noSeen: nss,
      seen: ss
    },
    stories: {
      noSeen: filterMeasureNoSeenStory,
      seen: filterMeasureSeenStory
    }
  }
    return {
        ...state,
        stories: storyStore,
        isLoading: false,
        errmess: null
    };
  }),
  on(storiesActions.storiesErrorAction, (state, { error }) => {
    return {
      ...state,
      stories: null,
      isLoading: false,
      errmess: error
    };
  })
);
export function storiesReducer(state: StoriesState | undefined, action: Action) {
  return storiesReducerInternal(state, action);
}
