import { z } from 'zod';

export const CreateCompanyContactDto = z.object({
  companyId: z.string().optional(),
  twitterLink: z.string().url().optional(),
  facebookLink: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export const UpdateCompanyContactDto = CreateCompanyContactDto.partial();

export type CreateCompanyContactDto = z.infer<typeof CreateCompanyContactDto>;
export type UpdateCompanyContactDto = z.infer<typeof UpdateCompanyContactDto>;