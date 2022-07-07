import { AuthState } from './auth/auth.state';
import { CommentsState } from './comments/comment.state';
import { FollowersState } from './followers/followers.state';
import { FollowingState } from './following/following.state';
import { InboxState } from './inbox/inbox.state';
import { LikesState } from './likes/likes.state';
import { NotificationsState } from './notifications/notifications.state';
import { OtherUserState } from './otherusers/otherusers.state';
import { ContentState } from './startcontent/content.state';
import { StoriesState } from './stories/stories.state';
import { UserState } from './user/user.state';

import { authReducer } from './auth/auth.reducer';
import { commentReducer } from './comments/comment.reducer';
import { followersReducer } from './followers/followers.reducer';
import { followingReducer } from './following/following.reducer';
import { inboxReducer } from './inbox/inbox.reducer';
import { likesReducer } from './likes/likes.reducer';
import { notificationsReducer } from './notifications/notifications.reducer';
import { otheruserReducer } from './otherusers/otherusers.reducer';
import { contentReducer } from './startcontent/content.reducer';
import { storiesReducer } from './stories/stories.reducer';
import { userReducer } from './user/user.reducer';


export interface RootState {
  auth: AuthState;
  comments: CommentsState;
  followers: FollowersState;
  following: FollowingState;
  inbox: InboxState;
  likes: LikesState;
  notifications: NotificationsState;
  otherusers: OtherUserState;
  content: ContentState;
  stories: StoriesState;
  user: UserState;
  }
  
  export const appReducer = {
    auth: authReducer,
    comments: commentReducer,
    followers: followersReducer,
    following: followingReducer,
    inbox: inboxReducer,
    likes: likesReducer,
    notifications: notificationsReducer,
    otherusers: otheruserReducer,
    content: contentReducer,
    stories: storiesReducer,
    user: userReducer
  };
  