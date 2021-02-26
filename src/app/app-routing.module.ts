import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CoursComponent} from './cours/cours.component';
import {TopicsComponent} from './topics/topics.component';
import {PostsComponent} from './posts/posts.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', pathMatch: 'prefix',
    canActivateChild: [AuthGuard],
    children: [
      {path: 'cours', component: CoursComponent},
      {path: 'topics/:idMatiere', component: TopicsComponent},
      {path: 'posts/:idTopic', component: PostsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
