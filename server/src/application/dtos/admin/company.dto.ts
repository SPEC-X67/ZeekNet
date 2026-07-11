import { z } from 'zod';
import { CompanyVerificationStatus } from 'src/domain/enums/verification-status.enum';
import { CompanyProfileDto } from 'src/application/dtos/company/profile/common/company-profile-fragments.dto';

// requests/get-companies-query.dto.ts
export const GetCompaniesQueryDtoSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional().default(10),
  search: z.string().optional(),
  isVerified: z.nativeEnum(CompanyVerificationStatus).optional(),
  isBlocked: z.coerce.boolean().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
export type GetCompaniesQueryDto = z.infer<typeof GetCompaniesQueryDtoSchema>;

// requests/verify-company-request.dto.ts
export const VerifyCompanyRequestDtoSchema = z.object({
  companyId: z.string().min(1, 'Company ID is required'),
  isVerified: z.enum(['pending', 'rejected', 'verified']),
  rejection_reason: z.string().optional(),
});
export type VerifyCompanyRequestDto = z.infer<typeof VerifyCompanyRequestDtoSchema>;
export const VerifyCompanyDto = VerifyCompanyRequestDtoSchema;

// responses/company-with-verification-result.dto.ts
export interface CompanyWithVerificationResult {
  id: string;
  userId: string;
  companyName: string;
  logo: string;
  banner: string;
  websiteLink: string;
  employeeCount: number;
  industry: string;
  organisation: string;
  aboutUs: string;
  isVerified: 'pending' | 'rejected' | 'verified';
  isBlocked: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
  verification?: {
    taxId: string;
    businessLicenseUrl: string;
  };
  contact?: {
    email: string;
    phone: string;
    twitterLink: string;
    facebookLink: string;
    linkedin: string;
  } | null;
  locations?: Array<{
    id: string;
    city: string;
    state: string;
    country: string;
    address: string;
    isPrimary: boolean;
  }>;
  techStack?: Array<{
    id: string;
    name: string;
    category: string;
  }>;
  benefits?: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  workplacePictures?: Array<{
    id: string;
    imageUrl: string;
    caption?: string;
  }>;
  activeJobCount?: number;
  jobs?: Array<{
    id: string;
    title: string;
    description: string;
    location: string;
    employmentType: string;
  }>;
}

// responses/paginated-companies-result.dto.ts
export interface PaginatedCompaniesResultDto {
  companies: CompanyProfileDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// responses/paginated-companies-with-verification-result.dto.ts
export interface PaginatedCompaniesWithVerificationResultDto {
  companies: CompanyWithVerificationResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
