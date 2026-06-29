import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  let authService: AuthService = inject(AuthService);

  let user = authService.connectedUser();

  if (user && user.token) {

    let clone = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + user.token),
    });

    return next(clone);
  }

  return next(req);
};
