import { User } from '../../domain/entities/user.entity';

export const sanitizeUserForResponse = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  isVerified: user.isVerified,
  isBlocked: user.isBlocked,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
