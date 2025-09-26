import { User } from '../../domain/entities/user.entity';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface SanitizedUser {
  id: string;
  name: string | undefined;
  email: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const sanitizeUser = (user: User): SanitizedUser => {
  const { password, refreshToken, ...userDetails } = user;
  return userDetails as SanitizedUser;
};

export const sanitizeUserForResponse = (user: User) => {
  const { password, refreshToken, ...userDetails } = user;
  return {
    id: userDetails.id,
    name: userDetails.name,
    email: userDetails.email,
    role: userDetails.role,
    isVerified: userDetails.isVerified,
    isBlocked: userDetails.isBlocked,
    createdAt: userDetails.createdAt,
  };
};

export const extractUserId = (req: AuthenticatedRequest): string | null => {
  return req.user?.id || null;
};

export const validateUserId = (userId: string | null): string => {
  if (!userId) {
    throw new Error('User ID not found');
  }
  return userId;
};
