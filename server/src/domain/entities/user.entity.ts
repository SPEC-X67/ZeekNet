import { UserRole } from '../enums/user-role.enum';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
    public readonly isVerified: boolean,
    public readonly isBlocked: boolean,
    public readonly refreshToken: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id: string;
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    isVerified?: boolean;
    isBlocked?: boolean;
    refreshToken?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): User {
    const now = new Date();
    return new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.role ?? UserRole.SEEKER,
      data.isVerified ?? false,
      data.isBlocked ?? false,
      data.refreshToken ?? null,
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }

  updateProfile(updates: {
    name?: string;
    email?: string;
  }): User {
    return new User(
      this.id,
      updates.name ?? this.name,
      updates.email ?? this.email,
      this.password,
      this.role,
      this.isVerified,
      this.isBlocked,
      this.refreshToken,
      this.createdAt,
      new Date(),
    );
  }

  changePassword(newPassword: string): User {
    return new User(
      this.id,
      this.name,
      this.email,
      newPassword,
      this.role,
      this.isVerified,
      this.isBlocked,
      this.refreshToken,
      this.createdAt,
      new Date(),
    );
  }

  verify(): User {
    if (this.isVerified) {
      throw new Error('User is already verified');
    }
    
    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      this.role,
      true,
      this.isBlocked,
      this.refreshToken,
      this.createdAt,
      new Date(),
    );
  }

  block(): User {
    if (this.isBlocked) {
      throw new Error('User is already blocked');
    }
    
    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      this.role,
      this.isVerified,
      true,
      this.refreshToken,
      this.createdAt,
      new Date(),
    );
  }

  unblock(): User {
    if (!this.isBlocked) {
      throw new Error('User is not blocked');
    }
    
    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      this.role,
      this.isVerified,
      false,
      this.refreshToken,
      this.createdAt,
      new Date(),
    );
  }

  changeRole(newRole: UserRole): User {
    if (this.role === newRole) {
      throw new Error('User already has this role');
    }
    
    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      newRole,
      this.isVerified,
      this.isBlocked,
      this.refreshToken,
      this.createdAt,
      new Date(),
    );
  }

  canLogin(): boolean {
    return this.isVerified && !this.isBlocked;
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  isCompany(): boolean {
    return this.role === UserRole.COMPANY;
  }

  isSeeker(): boolean {
    return this.role === UserRole.SEEKER;
  }

  isActive(): boolean {
    return !this.isBlocked;
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.name || this.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Valid email address is required');
    }

    if (!this.password || this.password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  sanitizeForResponse(): {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    } {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      isVerified: this.isVerified,
      isBlocked: this.isBlocked,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      isVerified: this.isVerified,
      isBlocked: this.isBlocked,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  static fromJSON(data: Record<string, unknown>): User {
    return new User(
      data.id as string,
      data.name as string,
      data.email as string,
      data.password as string,
      data.role as UserRole,
      data.isVerified as boolean,
      data.isBlocked as boolean,
      (data.refreshToken as string) ?? null,
      new Date(data.createdAt as string),
      new Date(data.updatedAt as string),
    );
  }
}