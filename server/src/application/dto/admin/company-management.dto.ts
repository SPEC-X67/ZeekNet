import { z } from 'zod';

export const BlockCompanyDto = z.object({
  companyId: z.string().min(1, 'Company ID is required'),
  isBlocked: z.boolean(),
});

export type BlockCompanyRequestDto = z.infer<typeof BlockCompanyDto>;

