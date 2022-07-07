import { Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { AuthGuardTrueService as Auth } from '../services/auth-guard-true.service';


import { LoginComponent } from '../home/login/login.component';
import { SignupComponent } from '../home/signup/signup.component';
import { StartHomeComponent } from '../start-view/start-home/start-home.component';
import { UserpageComponent } from '../users/userpage/userpage.component';
import { UsersComponent } from '../users/users/users.component';
import { ImageViewResponsiveComponent } from '../users/image-view-responsive/image-view-responsive.component';
import { UserpageOutloginComponent } from '../users/userpage-outlogin/userpage-outlogin.component';
import { SettingsComponent } from '../settings/settings.component';
import { MainInboxComponent } from '../inboxDM/main-inbox/main-inbox.component';
import { UsersStoriesComponent } from '../stories/users-stories/users-stories.component';
import { UserStoryComponent } from '../stories/user-story/user-story.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [Auth] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: StartHomeComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'userpage', component: UserpageComponent, canActivate: [AuthGuard] },
    { path: 'inbox', component: MainInboxComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [Auth] },
    { path: 'view/imagenwall/:idimg', component: ImageViewResponsiveComponent, canActivate: [AuthGuard] },
    { path: 'users/:username/:user', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'stories/:userId/:story', component: UsersStoriesComponent, canActivate: [AuthGuard] },
    { path: 'stories-user-wall/:userId', component: UserStoryComponent, canActivate: [AuthGuard] },
    { path: ':username', component: UserpageOutloginComponent , canActivate: [Auth] }
]