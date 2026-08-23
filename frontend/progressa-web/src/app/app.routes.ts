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
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard').then(
        m => m.Dashboard
      )
  },
  {
    path: 'topics',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/topics/topics').then(
        m => m.Topics
      )
  },
  {
    path: 'plans',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/plans/plans').then(
        m => m.Plans
      )
  },
  {
    path: 'progress',
    canActivate: [authGuard],
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
