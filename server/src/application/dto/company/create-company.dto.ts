import { z } from 'zod';
import { commonValidations, fieldValidations } from '../../../shared/validation/common';

export const CompanyContactDto = z.object({
  email: commonValidations.email,
  phone: commonValidations.phoneNumber,
  twitter_link: commonValidations.optionalUrl,
  facebook_link: commonValidations.optionalUrl,
  linkedin: commonValidations.optionalUrl,
});

export const OfficeLocationDto = z.object({
  location: fieldValidations.location,
  office_name: fieldValidations.companyName,
  address: fieldValidations.location,
  is_headquarters: commonValidations.boolean.default(false),
});

export const TechStackDto = z.object({
  tech_stack: fieldValidations.industry,
});

export const PerksAndBenefitsDto = z.object({
  perk: fieldValidations.industry,
  description: fieldValidations.description,
});

export const WorkplacePictureDto = z.object({
  picture_url: commonValidations.requiredUrl,
  caption: fieldValidations.description,
});

export const CompanyProfileDto = z.object({
  company_name: fieldValidations.companyName,
  logo: commonValidations.requiredUrl,
  banner: commonValidations.requiredUrl,
  website_link: commonValidations.requiredUrl,
  employee_count: commonValidations.positiveInteger,
  industry: fieldValidations.industry,
  about_us: fieldValidations.description,
});

export const CreateCompanyProfileDto = z.object({
  profile: CompanyProfileDto,
  contact: CompanyContactDto,
  office_locations: z.array(OfficeLocationDto).min(1),
  tech_stacks: z.array(TechStackDto).min(1),
  perks_and_benefits: z.array(PerksAndBenefitsDto).min(1),
  workplace_pictures: z.array(WorkplacePictureDto).min(1),
});

export const SimpleCompanyProfileDto = z.object({
  company_name: fieldValidations.companyName,
  email: commonValidations.email,
  website: commonValidations.optionalUrl,
  industry: fieldValidations.industry,
  organisation: z.string().min(1, 'Organisation type is required'),
  location: fieldValidations.location,
  employees: fieldValidations.employeeCount,
  description: fieldValidations.description,
  logo: commonValidations.optionalUrl,
  business_license: commonValidations.optionalUrl,
  tax_id: fieldValidations.taxId,
});

export const UpdateCompanyProfileDto = z.object({
  profile: CompanyProfileDto.partial(),
  contact: CompanyContactDto.partial().optional(),
  office_locations: z.array(OfficeLocationDto).optional(),
  tech_stacks: z.array(TechStackDto).optional(),
  perks_and_benefits: z.array(PerksAndBenefitsDto).optional(),
  workplace_pictures: z.array(WorkplacePictureDto).optional(),
});

export type CompanyProfileRequestDto = z.infer<typeof CompanyProfileDto>;
export type CompanyContactRequestDto = z.infer<typeof CompanyContactDto>;
export type OfficeLocationRequestDto = z.infer<typeof OfficeLocationDto>;
export type TechStackRequestDto = z.infer<typeof TechStackDto>;
export type PerksAndBenefitsRequestDto = z.infer<typeof PerksAndBenefitsDto>;
export type WorkplacePictureRequestDto = z.infer<typeof WorkplacePictureDto>;
export type CreateCompanyProfileRequestDto = z.infer<typeof CreateCompanyProfileDto>;
export type SimpleCompanyProfileRequestDto = z.infer<typeof SimpleCompanyProfileDto>;
export type UpdateCompanyProfileRequestDto = z.infer<typeof UpdateCompanyProfileDto>;
