import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

export const isAnonymousGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  if(authService.connectedUser()){
    router.navigate(['/']);
  }

  return !authService.connectedUser()
};
