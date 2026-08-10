import { z } from 'zod';

export const GetCompanyBenefitsSchema = z.object({
  userId: z.string(),
});
export const CreateCompanyBenefitsSchema = z.object({
  perk: z.string().min(1, 'Perk name cannot be empty'),
  description: z.string().optional(),
});
export const UpdateCompanyBenefitsSchema = z.object({
  benefitId: z.string().min(1, 'Benefit ID is required'),
  perk: z.string().min(1, 'Perk name cannot be empty').optional(),
  description: z.string().optional(),
});
export const DeleteCompanyBenefitsSchema = z.object({
  userId: z.string(),
  benefitId: z.string(),
});
