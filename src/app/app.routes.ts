import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs/trips', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.page').then(m => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.page').then(m => m.RegisterPage),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'tabs',
    canActivate: [authGuard],
    children: [
      {
        path: 'trips',
        loadComponent: () =>
          import('./features/trips/trip-list/trip-list.page').then(m => m.TripListPage),
      },
      {
        path: 'trips/create',
        loadComponent: () =>
          import('./features/trips/trip-create/trip-create.page').then(m => m.TripCreatePage),
      },
      {
        path: 'trips/:id',
        loadComponent: () =>
          import('./features/trips/trip-detail/trip-detail.page').then(m => m.TripDetailPage),
      },
      {
        path: 'trips/:id/planner',
        loadComponent: () =>
          import('./features/planner/day-plan/day-plan.page').then(m => m.DayPlanPage),
      },
      {
        path: 'trips/:id/chat',
        loadComponent: () =>
          import('./features/ai-chat/ai-chat.page').then(m => m.AiChatPage),
      },
      {
        path: 'trips/:id/budget',
        loadComponent: () =>
          import('./features/budget/budget.page').then(m => m.BudgetPage),
      },
      {
        path: 'explore',
        loadComponent: () =>
          import('./features/location/location.page').then(m => m.LocationPage),
      },
      { path: '', redirectTo: 'trips', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'tabs/trips' },
];
