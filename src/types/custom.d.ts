import { UserRole } from '../enums/user.enums';

declare global {
  namespace Express {
    interface User {
      id?: number;
      role?: UserRole;
      nickname?: string;
      email?: string;
    }
  }
}
