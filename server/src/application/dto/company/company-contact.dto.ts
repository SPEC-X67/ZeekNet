import { z } from 'zod';

export const CompanyContactDto = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  twitter_link: z.string().url().optional(),
  facebook_link: z.string().url().optional(),
  linkedin: z.string().url().optional(),
});

export type CompanyContactRequestDto = z.infer<typeof CompanyContactDto>;