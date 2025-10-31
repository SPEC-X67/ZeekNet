import { z } from 'zod';

export const CreateCompanyTechStackDtoSchema = z.object({
  companyId: z.string().optional(),
  techStack: z.string().min(1, 'Tech stack name cannot be empty'),
});

export const UpdateCompanyTechStackDtoSchema = CreateCompanyTechStackDtoSchema.partial();

export const CreateCompanyTechStackDto = CreateCompanyTechStackDtoSchema;
export const UpdateCompanyTechStackDto = UpdateCompanyTechStackDtoSchema;

export type CreateCompanyTechStackRequestDto = z.infer<typeof CreateCompanyTechStackDto>;
export type UpdateCompanyTechStackRequestDto = z.infer<typeof UpdateCompanyTechStackDto>;