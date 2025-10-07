import { User } from '../../entities/user.entity';
import { UserRole } from '../../enums/user-role.enum';

export interface IUserData {
  id?: string;
  name?: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  isBlocked: boolean;
  refreshToken: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserRepository {
  save(user: Omit<IUserData, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}

export interface IUserAuthRepository {
  updateRefreshToken(id: string, refreshToken: string | null): Promise<void>;
  updateVerificationStatus(email: string, isVerified: boolean): Promise<void>;
  updatePassword(id: string, hashedPassword: string): Promise<void>;
}

export interface IUserManagementRepository {
  findAllUsers(options: {
    page: number;
    limit: number;
    search?: string;
    role?: UserRole;
    isBlocked?: boolean;
  }): Promise<{ users: User[]; total: number }>;
  updateUserBlockStatus(id: string, isBlocked: boolean): Promise<void>;
}

// Removed IUserRepositoryFull - use specific interfaces instead
