import { UserRole } from '../enums/UserRole';

export interface UserTokenDto {
  user: UserDto;
  token: string;
}

export interface UserDto {
  id: number;
  username: string;
  role: UserRole;
}
