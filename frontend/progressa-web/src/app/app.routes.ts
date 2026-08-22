import { Routes } from '@angular/router';

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
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then(
        m => m.Dashboard
      )
  },
  {
    path: 'topics',
    loadComponent: () =>
      import('./features/topics/topics').then(
        m => m.Topics
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
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
