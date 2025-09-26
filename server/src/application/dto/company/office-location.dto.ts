import { z } from 'zod';

export const OfficeLocationDto = z.object({
  location: z.string().min(1),
  office_name: z.string().min(1),
  address: z.string().min(1),
  is_headquarters: z.boolean().default(false),
});

export type OfficeLocationRequestDto = z.infer<typeof OfficeLocationDto>;