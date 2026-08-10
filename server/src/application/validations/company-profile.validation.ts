import { z } from 'zod';
import { CompanyContactDto, CompanyContactResponseDto } from '../dtos/company-contact.dto';
import { CompanyOfficeLocationDto, CompanyLocationResponseDto } from '../dtos/company-office-location.dto';
import { CompanyTechStackDto } from '../dtos/company-tech-stack.dto';
import { CompanyBenefitsDto } from '../dtos/company-benefit.dto';
import { CompanyVerificationDto } from '../dtos/company-verification.dto';

export const SimpleUpdateCompanyProfileSchema = z.object({
  userId: z.string().optional(),
  company_name: z.string().min(1).optional(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  website_link: z.union([z.string().url(), z.literal('')]).optional(),
  employee_count: z.number().min(1).optional(),
  industry: z.string().min(1).optional(),
  organisation: z.string().min(1).optional(),
  about_us: z.string().min(1).optional(),
  business_license: z.string().optional(),
  tax_id: z.string().optional(),
});
export const CreateCompanyProfileFromSchema = z.object({
  userId: z.string().optional(),
  company_name: z.string().min(1, 'Company name is required'),
  logo: z.string().url('Invalid logo URL').optional(),
  website: z.string().url('Invalid website URL').optional(),
  employees: z.string().min(1, 'Employee count is required'),
  industry: z.string().min(1, 'Industry is required'),
  organisation: z.string().min(1, 'Organisation is required'),
  description: z.string().min(1, 'Description is required'),
  tax_id: z.string().optional(),
  business_license: z.string().url('Invalid business license URL').optional(),
  email: z.string().email('Invalid email').optional(),
  location: z.string().optional(),
});
export const CreateCompanyProfileRequestSchema = z.object({
  userId: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required'),
  logo: z.string().url('Invalid logo URL'),
  banner: z.string().url('Invalid banner URL'),
  websiteLink: z.string().url('Invalid website URL'),
  employeeCount: z.number().int().positive('Employee count must be positive'),
  industry: z.string().min(1, 'Industry is required'),
  organisation: z.string().min(1, 'Organisation is required'),
  aboutUs: z.string().min(1, 'About us is required'),
  foundedDate: z.coerce.date().optional(),
  phone: z.string().optional(),
  taxId: z.string().optional(),
  businessLicenseUrl: z.string().url('Invalid business license URL').optional(),
  email: z.string().email('Invalid email').optional(),
  location: z.string().optional(),
});
export const SimpleCompanyProfileSchema = z.object({
  company_name: z.string().min(1, 'Company name is required').min(2, 'Company name must be at least 2 characters').max(100, 'Company name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  industry: z.string().min(1, 'Industry is required').min(2, 'Industry must be at least 2 characters').max(50, 'Industry must be less than 50 characters'),
  organisation: z.string().min(1, 'Organisation type is required'),
  location: z.string().min(1, 'Location is required').min(2, 'Location must be at least 2 characters').max(100, 'Location must be less than 100 characters'),
  employees: z.string().min(1, 'Employee count is required').refine((val) => {
    const validOptions = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
    return validOptions.includes(val);
  }, 'Please select a valid employee count range'),
  description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  logo: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  business_license: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  tax_id: z.string().min(1, 'Tax ID is required').min(3, 'Tax ID must be at least 3 characters').max(20, 'Tax ID must be less than 20 characters'),
});
