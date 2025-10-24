import { User } from '../../../entities/user.entity';
import { UserRole } from '../../../enums/user-role.enum';

export interface IUserData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  isBlocked: boolean;
  refreshToken: string | null;
}

export interface IUserRepository {
  create(userData: IUserData): Promise<User>;
  save(userData: Partial<IUserData>): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateVerificationStatus(userId: string, isVerified: boolean): Promise<void>;
}

export interface IUserAuthRepository {
  updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
  updatePassword(userId: string, hashedPassword: string): Promise<void>;
  updateVerificationStatus(email: string, isVerified: boolean): Promise<void>;
  findByRefreshToken(refreshToken: string): Promise<User | null>;
}

export interface IUserManagementRepository {
  getAllUsers(options: {
    page: number;
    limit: number;
    search?: string;
    role?: UserRole;
    isVerified?: boolean;
    isBlocked?: boolean;
  }): Promise<{ users: User[]; total: number }>;

  findAllUsers(options: {
    page: number;
    limit: number;
    search?: string;
    role?: UserRole;
    isBlocked?: boolean;
  }): Promise<{ users: User[]; total: number }>;

  blockUser(userId: string, isBlocked: boolean): Promise<void>;
  updateUserBlockStatus(userId: string, isBlocked: boolean): Promise<void>;
  deleteUser(userId: string): Promise<void>;
}
