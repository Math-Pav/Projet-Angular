import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostListComponent } from './pages/post-list/post-list.component';

export const USERS_ROUTES: Routes = [
  { path: '', component: UserListComponent },  
  { path: 'posts/:id', component: PostDetailComponent }, 
  { path: 'posts', component: PostListComponent },  
  { path: ':id', component: UserDetailComponent }  
];

