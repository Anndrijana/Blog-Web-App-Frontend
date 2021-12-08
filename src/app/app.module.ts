import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-rating';

import { CommentService } from './services/comment.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PostsComponent } from './components/posts/posts.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PostsAllComponent } from './components/posts/posts-all/posts-all.component';
import { PostDetailComponent } from './components/posts/post-detail/post-detail.component';
import { UpdatePostComponent } from './components/posts/update-post/update-post.component';
import { HeaderComponent } from './components/header/header.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'posts/all', component: PostsAllComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'post/add', component: AddPostComponent},
  { path: 'post/:id/edit', component: UpdatePostComponent},
  { path: 'post/:id', component: PostDetailComponent},
  { path: '**', redirectTo: 'posts' }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    AddPostComponent,
    PostsAllComponent,
    PostDetailComponent,
    UpdatePostComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: true }
    )
  ],
  providers: [
    UserService,
    PostService,
    CommentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
