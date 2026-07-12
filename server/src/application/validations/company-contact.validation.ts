import { z } from 'zod';

export const GetCompanyContactSchema = z.object({ userId: z.string() });
export const urlSchema = z.string().optional().refine((val) => {
  if (!val || val.trim() === '') return true;
  try {
    const url = val.startsWith('http') ? val : `https://${val}`;
    new URL(url);
    return true;
  } catch {
    return false;
  }
}, { message: 'Invalid url' });
export const UpsertCompanyContactSchema = z.object({
  userId: z.string(),
  twitterLink: urlSchema,
  facebookLink: urlSchema,
  linkedin: urlSchema,
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
});
export const UpdateCompanyContactSchema = UpsertCompanyContactSchema;
