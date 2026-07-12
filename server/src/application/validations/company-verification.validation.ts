import { z } from 'zod';
import { CompanyVerificationStatus } from 'src/domain/enums/verification-status.enum';
import { CompanyProfileDto } from '../dtos/company-profile.dto';

export const CompanyVerificationRequestSchema = z.object({
  userId: z.string().optional(),
  taxId: z.string().min(1, 'Tax ID is required').optional(),
  businessLicenseUrl: z.string().url('Invalid business license URL').optional(),
});
export const GetCompaniesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional().default(10),
  search: z.string().optional(),
  isVerified: z.nativeEnum(CompanyVerificationStatus).optional(),
  isBlocked: z.coerce.boolean().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
export const VerifyCompanyRequestSchema = z.object({
  companyId: z.string().min(1, 'Company ID is required'),
  isVerified: z.enum(['pending', 'rejected', 'verified']),
  rejection_reason: z.string().optional(),
});
export const VerifyCompanySchema = VerifyCompanyRequestSchema;
