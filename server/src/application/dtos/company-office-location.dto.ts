import { GetCompanyOfficeLocationSchema, CreateCompanyOfficeLocationSchema, UpdateCompanyOfficeLocationSchema, DeleteCompanyOfficeLocationSchema } from 'src/application/validations/company-office-location.validation';
import { z } from 'zod';

export interface CompanyOfficeLocationDto {
  id: string;
  companyId: string;
  location: string;
  officeName?: string;
  address?: string;
  isHeadquarters: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type GetCompanyOfficeLocationRequestDto = z.infer<typeof GetCompanyOfficeLocationSchema>;
export type CreateCompanyOfficeLocationRequestDto = z.infer<typeof CreateCompanyOfficeLocationSchema> & { userId: string };
export type UpdateCompanyOfficeLocationRequestDto = z.infer<typeof UpdateCompanyOfficeLocationSchema> & { userId: string };
export type DeleteCompanyOfficeLocationRequestDto = z.infer<typeof DeleteCompanyOfficeLocationSchema>;
export interface CompanyLocationResponseDto {
  id: string;
  location: string;
  office_name: string;
  address: string;
  is_headquarters: boolean;
}
