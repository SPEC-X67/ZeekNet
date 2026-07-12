import { GetCompanyContactSchema, urlSchema, UpsertCompanyContactSchema, UpdateCompanyContactSchema } from 'src/application/validations/company-contact.validation';
import { z } from 'zod';

export interface CompanyContactDto {
  id: string;
  companyId: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  createdAt: Date;
  updatedAt: Date;
}
export { GetCompanyContactSchema, UpsertCompanyContactSchema, UpdateCompanyContactSchema };
export type GetCompanyContactRequestDto = z.infer<typeof GetCompanyContactSchema>;
export type UpsertCompanyContactRequestDto = z.infer<typeof UpsertCompanyContactSchema>;
export type UpdateCompanyContactRequestDto = z.infer<typeof UpdateCompanyContactSchema>;
export interface CompanyContactResponseDto {
  id: string;
  email: string;
  phone: string;
  twitter_link: string;
  facebook_link: string;
  linkedin: string;
}
