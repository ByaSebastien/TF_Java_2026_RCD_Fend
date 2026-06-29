import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserRole } from '../../../features/auth/enums/UserRole';
import { UserTokenDto } from '../../../features/auth/models/user.token.dto';
import { Link } from '../../models/link';
import { AuthService } from '../../../features/auth/services/auth.service';


@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private readonly _authService: AuthService = inject(AuthService);

  connectedUser: WritableSignal<UserTokenDto | undefined> = this._authService.connectedUser;

  navLinks: Link[] = [
    {
      label: 'Product',
      path: '/',
      roles: [UserRole.ANONYMOUS, UserRole.USER, UserRole.ADMIN],
    },
    {
      label: 'About',
      path: '/about',
      roles: [UserRole.ANONYMOUS, UserRole.USER, UserRole.ADMIN],
    },
    {
      label: 'User',
      path: '/user',
      roles: [UserRole.USER, UserRole.ADMIN],
    },
    {
      label: 'Admin',
      path: '/admin',
      roles: [UserRole.ADMIN],
    },
    {
      label: 'Register',
      path: '/register',
      roles: [UserRole.ANONYMOUS],
    },
    {
      label: 'Login',
      path: '/login',
      roles: [UserRole.ANONYMOUS],
    },
    {
      label: 'Logout',
      roles: [UserRole.USER, UserRole.ADMIN],
      action: () => {
        this._authService.logout();
      },
    },
  ];

  links = computed(() => {
    let currentRole = this.connectedUser()?.user.role ?? UserRole.ANONYMOUS;
    return this.navLinks.filter((l) => l.roles.includes(currentRole));
  });
}
