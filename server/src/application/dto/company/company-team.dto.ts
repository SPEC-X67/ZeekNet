import { z } from 'zod';

export const CreateCompanyTeamDto = z.object({
  companyId: z.string().optional(), // Will be set by the system
  name: z.string().min(1, 'Name cannot be empty'),
  role: z.string().min(1, 'Role cannot be empty'),
  avatar: z.string().url('Avatar must be a valid URL').optional(),
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
});

export const UpdateCompanyTeamDto = CreateCompanyTeamDto.partial();

export type CreateCompanyTeamDto = z.infer<typeof CreateCompanyTeamDto>;
export type UpdateCompanyTeamDto = z.infer<typeof UpdateCompanyTeamDto>;
