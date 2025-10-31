import { z } from 'zod';

export const LogoutDto = z.object({
  userId: z.string(),
});

export type LogoutRequestDto = z.infer<typeof LogoutDto>;