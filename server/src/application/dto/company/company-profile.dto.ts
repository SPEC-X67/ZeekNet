import { z } from 'zod';

export const CompanyProfileDto = z.object({
  company_name: z.string().min(1),
  logo: z.string().url(),
  banner: z.string().url(),
  website_link: z.string().url(),
  employee_count: z.number().min(1),
  industry: z.string().min(1),
  about_us: z.string().min(10),
});

export const SimpleCompanyProfileDto = z.object({
  company_name: z.string().min(1),
  email: z.string().email(),
  website: z.string().url(),
  industry: z.string().min(1),
  organisation: z.string().min(1),
  location: z.string().min(1),
  employees: z.string().min(1),
  description: z.string().min(10),
  logo: z.string().optional(),
  business_license: z.string().optional(),
  tax_id: z.string().min(1),
});

export type CompanyProfileRequestDto = z.infer<typeof CompanyProfileDto>;
export type SimpleCompanyProfileRequestDto = z.infer<typeof SimpleCompanyProfileDto>;