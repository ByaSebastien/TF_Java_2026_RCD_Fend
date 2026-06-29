import { Component, computed, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserRole } from '../../../features/auth/enums/UserRole';
import { UserTokenDto } from '../../../features/auth/models/user.token.dto';
import { Link } from '../../models/link';

export const navLinks: Link[] = [
  {
    label: 'Home',
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
    label: 'Logout',
    roles: [UserRole.USER, UserRole.ADMIN],
    action: () => {
      console.log('Logout action triggered');
    }
  }
];

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  connectedUser: WritableSignal<UserTokenDto | undefined> = signal(undefined);

  links = computed(() => {
    let currentRole = this.connectedUser()?.user.role ?? UserRole.ANONYMOUS;
    return navLinks.filter((l) => l.roles.includes(currentRole));
  });

  switchRole() {
    if (!this.connectedUser()) {
      this.connectedUser.set({
        user: {
          role: UserRole.USER,
          id: 1,
          username: 'User'
        },
        token: ''
      });
    } else if (this.connectedUser()?.user.role === UserRole.USER) {
      this.connectedUser.set({
        user: {
          role: UserRole.ADMIN,
          id: 1,
          username: 'Admin',
        },
        token: '',
      });
    } else if (this.connectedUser()?.user.role === UserRole.ADMIN) {
      this.connectedUser.set(undefined);
    }
  }
}
