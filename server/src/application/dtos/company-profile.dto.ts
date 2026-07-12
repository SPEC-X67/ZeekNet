import { SimpleUpdateCompanyProfileSchema, CreateCompanyProfileFromSchema, CreateCompanyProfileRequestSchema, SimpleCompanyProfileSchema } from 'src/application/validations/company-profile.validation';
import { z } from 'zod';
import { CompanyContactDto, CompanyContactResponseDto } from './company-contact.dto';
import { CompanyOfficeLocationDto, CompanyLocationResponseDto } from './company-office-location.dto';
import { CompanyTechStackDto } from './company-tech-stack.dto';
import { CompanyBenefitsDto } from './company-benefit.dto';
import { CompanyVerificationDto } from './company-verification.dto';

export interface CompanyProfileDto {
  id: string;
  userId: string;
  companyName: string;
  logo?: string;
  banner?: string;
  websiteLink?: string;
  employeeCount: number;
  industry: string;
  organisation: string;
  aboutUs: string;
  isVerified: string;
  isBlocked: boolean;
  rejectionReason?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CompanyWorkplacePicturesDto {
  id: string;
  companyId: string;
  pictureUrl: string;
  caption?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type SimpleUpdateCompanyProfileRequestDto = z.infer<typeof SimpleUpdateCompanyProfileSchema>;
export type CreateCompanyProfileFromDtoRequestDto = z.infer<typeof CreateCompanyProfileFromSchema>;
export type CreateCompanyProfileRequestDtoType = z.infer<typeof CreateCompanyProfileRequestSchema>;
export interface CompanyProfileResponseDto {
  id: string;
  company_name: string;
  logo: string;
  banner: string;
  website_link: string;
  employee_count: number;
  industry: string;
  organisation: string;
  about_us: string;
  is_verified: 'pending' | 'rejected' | 'verified';
  is_blocked: boolean;
  rejection_reason?: string;
  tax_id?: string;
  business_license?: string;
  created_at: Date;
  updated_at: Date;
}
export interface CompanyProfileWithDetailsResponseDto {
  profile: CompanyProfileResponseDto;
  contact: CompanyContactResponseDto | null;
  locations: CompanyLocationResponseDto[];
  techStack: { id: string; techStack: string }[];
  benefits: { id: string; perk: string; description: string }[];
  workplacePictures: { id: string; pictureUrl: string; caption?: string }[];
  jobPostings: {
    id: string;
    title: string;
    description: string;
    location: string;
    employmentType: string;
    salaryMin?: number;
    salaryMax?: number;
    status: 'active' | 'unlisted' | 'expired' | 'blocked' | 'closed';
    createdAt: string;
    updatedAt: string;
  }[];
}
export interface CompanyProfileWithDetailsDto {
  profile: CompanyProfileDto;
  contact: CompanyContactDto | null;
  locations: CompanyOfficeLocationDto[];
  techStack: CompanyTechStackDto[];
  benefits: CompanyBenefitsDto[];
  workplacePictures: CompanyWorkplacePicturesDto[];
  verification: CompanyVerificationDto | null;
}
export type SimpleCompanyProfileRequestDto = z.infer<typeof SimpleCompanyProfileSchema>;
