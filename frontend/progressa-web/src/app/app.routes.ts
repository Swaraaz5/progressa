import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(
        m => m.Login
      )
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/components/layout/layout').then(
        m => m.Layout
      ),
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(
            m => m.Dashboard
          )
      },

      {
        path: 'topics',
        loadComponent: () =>
          import('./features/topics/subjects/subjects').then(
            m => m.Subjects
          )
      },

      {
        path: 'topics/:subjectId',
        loadComponent: () =>
          import('./features/topics/topic-list/topic-list').then(
            m => m.TopicList
          )
      },

      {
        path: 'topics/:subjectId/:topicId',
        loadComponent: () =>
          import('./features/topics/subtopic-list/subtopic-list').then(
            m => m.SubtopicList
          )
      },

      {
        path: 'plans',
        loadComponent: () =>
          import('./features/plans/plans').then(
            m => m.Plans
          )
      },

      {
        path: 'progress',
        loadComponent: () =>
          import('./features/progress/progress').then(
            m => m.Progress
          )
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];
