import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  // ==========================================
  // DEFAULT
  // ==========================================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  // ==========================================
  // LOGIN
  // ==========================================

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(
        m => m.Login
      )
  },


  // ==========================================
  // AUTHENTICATED LAYOUT
  // ==========================================

  {
    path: '',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./shared/components/layout/layout').then(
        m => m.Layout
      ),

    children: [

      // ========================================
      // DASHBOARD
      // ========================================

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(
            m => m.Dashboard
          )
      },


      // ========================================
      // SUBJECTS
      // ========================================

      {
        path: 'subjects',
        loadComponent: () =>
          import('./features/topics/subjects/subjects').then(
            m => m.Subjects
          )
      },


      // ========================================
      // ADD SUBJECT
      // ========================================

      {
        path: 'subjects/add',
        loadComponent: () =>
          import(
            './features/topics/subjects/add-subject/add-subject'
          ).then(
            m => m.AddSubject
          )
      },


      // ========================================
      // TOPICS
      // ========================================
      // Disabled for now.
      // We will enable this after Add Subject
      // is completely finished.


      {
        path: 'subjects/:subjectId',
        loadComponent: () =>
          import(
            './features/topics/topic-list/topic-list'
          ).then(
            m => m.TopicList
          )
      },



      // ========================================
      // SUBTOPICS
      // ========================================
      // Disabled for now.


      {
        path: 'subjects/:subjectId/:topicId',
        loadComponent: () =>
          import(
            './features/topics/subtopic-list/subtopic-list'
          ).then(
            m => m.SubtopicList
          )
      },



      // ========================================
      // PLANS
      // ========================================

      {
        path: 'roadmap',
        loadComponent: () =>
          import('./features/roadmap/roadmap').then(
            m => m.Roadmap
          )
      },


      // ========================================
      // PROGRESS
      // ========================================

      {
        path: 'progress',
        loadComponent: () =>
          import('./features/progress/progress').then(
            m => m.Progress
          )
      }

    ]
  },


  // ==========================================
  // FALLBACK
  // ==========================================

  {
    path: '**',
    redirectTo: 'login'
  }

];
