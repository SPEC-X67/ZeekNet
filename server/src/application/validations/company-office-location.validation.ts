import { z } from 'zod';

export const GetCompanyOfficeLocationSchema = z.object({ userId: z.string() });
export const CreateCompanyOfficeLocationSchema = z.object({
  location: z.string().min(1, 'Location cannot be empty'),
  officeName: z.string().optional(),
  address: z.string().optional(),
  isHeadquarters: z.boolean().default(false),
});
export const UpdateCompanyOfficeLocationSchema = z.object({
  locationId: z.string().min(1, 'Location ID is required'),
  location: z.string().min(1, 'Location cannot be empty').optional(),
  officeName: z.string().optional(),
  address: z.string().optional(),
  isHeadquarters: z.boolean().optional(),
});
export const DeleteCompanyOfficeLocationSchema = z.object({ userId: z.string(), locationId: z.string() });
