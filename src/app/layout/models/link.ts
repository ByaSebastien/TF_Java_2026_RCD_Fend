import { UserRole } from '../../features/auth/enums/UserRole';

export interface Link {
  label: string;
  path?: string;
  action?: () => void;
  roles: UserRole[];
}
