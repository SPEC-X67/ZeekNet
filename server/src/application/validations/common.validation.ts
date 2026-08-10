import { z } from 'zod';

export const ParamsWithIdSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});
