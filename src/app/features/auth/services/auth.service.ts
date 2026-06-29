import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../models/register.form';
import { environment } from '../../../../environments/environment';
import { UserTokenDto } from '../models/user.token.dto';
import { LoginForm } from '../models/login.form';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly _http: HttpClient = inject(HttpClient);

  connectedUser = signal<UserTokenDto | undefined>(undefined);

  constructor() {

    let json = localStorage.getItem('connectedUser');

    if(json) {
      this.connectedUser.set(JSON.parse(json));
    }
  }

  public register(form: RegisterForm) {
    return this._http.post<void>(`${environment.apiUrl}/register`, form);
  }

  public login(form: LoginForm) {
    return this._http.post<UserTokenDto>(`${environment.apiUrl}/login`, form).pipe(
      tap(u => {
        this.connectedUser.set(u);
        localStorage.setItem('connectedUser', JSON.stringify(u));
      }),
    );
  }

  public logout() {
    localStorage.removeItem('connectedUser');
    this.connectedUser.set(undefined);
  }
}
