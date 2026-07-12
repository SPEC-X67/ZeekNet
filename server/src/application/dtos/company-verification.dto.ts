import { CompanyVerificationRequestSchema, GetCompaniesQuerySchema, VerifyCompanyRequestSchema, VerifyCompanySchema } from 'src/application/validations/company-verification.validation';
import { z } from 'zod';
import { CompanyVerificationStatus } from 'src/domain/enums/verification-status.enum';
import { CompanyProfileDto } from './company-profile.dto';

export interface CompanyVerificationDto {
  id: string;
  companyId: string;
  taxId: string;
  businessLicenseUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
export type CompanyVerificationRequestDto = z.infer<typeof CompanyVerificationRequestSchema>;
export interface ReapplyVerificationRequestDto {
  userId: string;
  company_name: string;
  email: string;
  website: string;
  industry: string;
  organisation: string;
  location: string;
  employees: string;
  description: string;
  logo: string;
  tax_id: string;
  business_license: string;
}
export type GetCompaniesQueryDto = z.infer<typeof GetCompaniesQuerySchema>;
export type VerifyCompanyRequestDto = z.infer<typeof VerifyCompanyRequestSchema>;
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
export interface PaginatedCompaniesResultDto {
  companies: CompanyProfileDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface PaginatedCompaniesWithVerificationResultDto {
  companies: CompanyWithVerificationResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
