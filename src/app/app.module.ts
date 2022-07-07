import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './models/store/indexStore';

import { AppComponent } from './app.component';
import { TalkComponent } from './inboxDM/talks-view/talk/talk.component';
import { UserStoryComponent } from './stories/user-story/user-story.component';
import { UsersStoriesComponent } from './stories/users-stories/users-stories.component';
import { StartStoryComponent } from './stories/start-story/start-story.component';
import { UserpageComponent } from './users/userpage/userpage.component';
import { UsersComponent } from './users/users/users.component';
import { UserpageOutloginComponent } from './users/userpage-outlogin/userpage-outlogin.component';
import { FollowTabComponent } from './follow-tab/follow-tab.component';
import { WarningComponent } from './modals/warning/warning.component';
import { LikesComponent } from './modals/likes/likes.component';
import { ProfileImageComponent } from './modals/profile-image/profile-image.component';
import { ImagesComponent } from './modals/images/images.component';
import { SettingsComponent } from './settings/settings.component';
import { StartItemsComponent } from './start-view/start-items/start-items.component';
import { StartHomeComponent } from './start-view/start-home/start-home.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { ImageViewResponsiveComponent } from './users/image-view-responsive/image-view-responsive.component';
import { ChatViewComponent } from './inboxDM/chat-view/chat-view.component';
import { FollowViewComponent } from './inboxDM/follow-view/follow-view.component';
import { MainInboxComponent } from './inboxDM/main-inbox/main-inbox.component';
import { TalksViewComponent } from './inboxDM/talks-view/talks-view.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { LoginupComponent } from './modals/loginup/loginup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import { AuthGuardTrueService } from './services/auth-guard-true.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { InboxService } from './services/inbox.service';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { UsersService } from './services/users.service';
import { SearchService } from './services/search.service';
import { CommentsService } from './services/comments.service';
import { FileUploadService } from './services/file-upload.service';
import { FollowService } from './services/follow.service';
import { LikeHandleService } from './services/like-handle.service';
import { StartContentService } from './services/start-content.service';

import 'hammerjs';

import { baseURL } from './shared/baseurl';
import { countries } from './shared/countries';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {
	url: baseURL, // socket server url;
	options: {
		transports: ['websocket']
	}
}

@NgModule({
  declarations: [
    AppComponent,
    TalkComponent,
    UserStoryComponent,
    UsersStoriesComponent,
    StartStoryComponent,
    UserpageComponent,
    UsersComponent,
    UserpageOutloginComponent,
    FollowTabComponent,
    WarningComponent,
    LikesComponent,
    ProfileImageComponent,
    ImagesComponent,
    SettingsComponent,
    StartItemsComponent,
    StartHomeComponent,
    NavbarComponent,
    ImageViewResponsiveComponent,
    ChatViewComponent,
    FollowViewComponent,
    MainInboxComponent,
    TalksViewComponent,
    LoginComponent,
    SignupComponent,
    LoginupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthGuardTrueService,
    AuthGuardService,
    AuthService,
    InboxService,
    ProcessHttpmsgService,
    UsersService,
    SearchService,
    CommentsService,
    FileUploadService,
    FollowService,
    LikeHandleService,
    StartContentService,
    { provide: 'baseURL', useValue: baseURL },
    { provide: 'countries', useValue: countries },
    { provide: Window , useValue: window },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
  ],
  entryComponents: [
    LoginupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
