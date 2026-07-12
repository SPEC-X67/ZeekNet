import { z } from 'zod';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { SeekerProfileResponseDto } from '../dtos/seeker-profile.dto';

export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  isVerified: z.boolean(),
  isBlocked: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  avatar: z.string().optional(),
  seekerProfile: z.custom<SeekerProfileResponseDto>().optional(),
});
export const BlockUserRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  isBlocked: z.boolean(),
});
export const BlockUserSchema = BlockUserRequestSchema;
export const GetAllUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional().default(10),
  search: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  isBlocked: z.preprocess(
    (val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      if (typeof val === 'boolean') return val;
      return undefined;
    },
    z.boolean().optional(),
  ),
});
export const GetAllUsersSchema = GetAllUsersQuerySchema;
export const GetUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional().default(10),
  search: z.string().optional(),
  role: z.string().optional(),
  isBlocked: z.coerce.boolean().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
