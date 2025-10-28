import { z } from 'zod';

export const CreateCompanyBenefitsDtoSchema = z.object({
  companyId: z.string().optional(),
  perk: z.string().min(1, 'Perk name cannot be empty'),
  description: z.string().optional(),
});

export const UpdateCompanyBenefitsDtoSchema = CreateCompanyBenefitsDtoSchema.partial();

export const CreateCompanyBenefitsDto = CreateCompanyBenefitsDtoSchema;
export const UpdateCompanyBenefitsDto = UpdateCompanyBenefitsDtoSchema;

export type CreateCompanyBenefitsRequestDto = z.infer<typeof CreateCompanyBenefitsDto>;
export type UpdateCompanyBenefitsRequestDto = z.infer<typeof UpdateCompanyBenefitsDto>;
