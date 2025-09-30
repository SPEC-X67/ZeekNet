import { z } from 'zod';

export const CreateCompanyBenefitsDto = z.object({
  companyId: z.string().optional(), // Will be set by the system
  perk: z.string().min(1, 'Perk name cannot be empty'),
  description: z.string().optional(),
});

export const UpdateCompanyBenefitsDto = CreateCompanyBenefitsDto.partial();

export type CreateCompanyBenefitsDto = z.infer<typeof CreateCompanyBenefitsDto>;
export type UpdateCompanyBenefitsDto = z.infer<typeof UpdateCompanyBenefitsDto>;
