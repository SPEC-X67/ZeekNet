import { GetCompanyTechStackSchema, CreateCompanyTechStackSchema, UpdateCompanyTechStackSchema, DeleteCompanyTechStackSchema } from 'src/application/validations/company-tech-stack.validation';
import { z } from 'zod';

export interface CompanyTechStackDto {
  id: string;
  companyId: string;
  techStack: string;
  createdAt: Date;
  updatedAt: Date;
}
export {
  GetCompanyTechStackSchema as GetCompanyTechStackDto,
  CreateCompanyTechStackSchema as CreateCompanyTechStackDto,
  UpdateCompanyTechStackSchema as UpdateCompanyTechStackDto,
  DeleteCompanyTechStackSchema as DeleteCompanyTechStackDto,
};
export type GetCompanyTechStackRequestDto = z.infer<typeof GetCompanyTechStackSchema>;
export type CreateCompanyTechStackRequestDto = z.infer<typeof CreateCompanyTechStackSchema> & { userId: string };
export type UpdateCompanyTechStackRequestDto = z.infer<typeof UpdateCompanyTechStackSchema> & { userId: string };
export type DeleteCompanyTechStackRequestDto = z.infer<typeof DeleteCompanyTechStackSchema>;
export interface CompanyTechStackResponseDto {
  id: string;
  techStack: string;
  createdAt: Date;
  updatedAt: Date;
}
