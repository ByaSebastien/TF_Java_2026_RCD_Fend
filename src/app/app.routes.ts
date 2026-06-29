import { Routes } from '@angular/router';
import { isAnonymousGuard } from './shared/guards/is-anonymous.guard';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./features/auth/pages/register/register').then((m) => m.Register),
    canActivate: [isAnonymousGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.Login),
    canActivate: [isAnonymousGuard],
  },
];
