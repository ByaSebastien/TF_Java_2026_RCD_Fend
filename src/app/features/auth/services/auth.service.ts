import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../models/register.form';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly _http: HttpClient = inject(HttpClient);

  public register(form: RegisterForm) {
    return this._http.post<void>(`${environment.apiUrl}/register`, form);
  }
}
