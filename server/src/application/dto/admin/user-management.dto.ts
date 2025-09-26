import { z } from 'zod';
import { UserRole } from '../../../domain/enums/user-role.enum';

export const GetAllUsersDto = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
  search: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  isBlocked: z.string().optional(),
});

export const BlockUserDto = z.object({
  userId: z.string().min(1),
  isBlocked: z.boolean(),
});

export const GetAllCompaniesDto = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
  search: z.string().optional(),
  industry: z.string().optional(),
  isVerified: z.enum(['pending', 'rejected', 'verified']).optional(),
  isBlocked: z.string().optional(),
});

export const CompanyVerificationDto = z.object({
  companyId: z.string().min(1),
  isVerified: z.enum(['pending', 'rejected', 'verified']),
  rejection_reason: z.string().optional(),
});

export type GetAllUsersRequestDto = z.infer<typeof GetAllUsersDto>;
export type BlockUserRequestDto = z.infer<typeof BlockUserDto>;
export type GetAllCompaniesRequestDto = z.infer<typeof GetAllCompaniesDto>;
export type CompanyVerificationRequestDto = z.infer<typeof CompanyVerificationDto>;
