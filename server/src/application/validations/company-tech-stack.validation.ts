import { z } from 'zod';

export const GetCompanyTechStackSchema = z.object({ userId: z.string() });
export const CreateCompanyTechStackSchema = z.object({ name: z.string().min(1, 'Tech stack name cannot be empty') });
export const UpdateCompanyTechStackSchema = z.object({
  techStackId: z.string(),
  name: z.string().min(1, 'Tech stack name cannot be empty'),
});
export const DeleteCompanyTechStackSchema = z.object({ userId: z.string(), techStackId: z.string() });
