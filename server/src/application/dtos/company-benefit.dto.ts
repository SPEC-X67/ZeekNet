import { GetCompanyBenefitsSchema, CreateCompanyBenefitsSchema, UpdateCompanyBenefitsSchema, DeleteCompanyBenefitsSchema } from 'src/application/validations/company-benefit.validation';
import { z } from 'zod';

export interface CompanyBenefitsDto {
  id: string;
  companyId: string;
  perk: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
export {
  GetCompanyBenefitsSchema as GetCompanyBenefitsDto,
  CreateCompanyBenefitsSchema as CreateCompanyBenefitsDto,
  UpdateCompanyBenefitsSchema as UpdateCompanyBenefitsDto,
  DeleteCompanyBenefitsSchema as DeleteCompanyBenefitsDto,
};
export type GetCompanyBenefitsRequestDto = z.infer<typeof GetCompanyBenefitsSchema>;
export type CreateCompanyBenefitsRequestDto = z.infer<typeof CreateCompanyBenefitsSchema> & { userId: string };
export type UpdateCompanyBenefitsRequestDto = z.infer<typeof UpdateCompanyBenefitsSchema> & { userId: string };
export type DeleteCompanyBenefitsRequestDto = z.infer<typeof DeleteCompanyBenefitsSchema>;
export interface CompanyBenefitResponseDto {
  id: string;
  perk: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
