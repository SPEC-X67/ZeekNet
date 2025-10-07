import { z } from 'zod';

export const CreateCompanyTechStackDto = z.object({
  companyId: z.string().optional(),
  techStack: z.string().min(1, 'Tech stack name cannot be empty'),
});

export const UpdateCompanyTechStackDto = CreateCompanyTechStackDto.partial();

export type CreateCompanyTechStackDto = z.infer<typeof CreateCompanyTechStackDto>;
export type UpdateCompanyTechStackDto = z.infer<typeof UpdateCompanyTechStackDto>;
