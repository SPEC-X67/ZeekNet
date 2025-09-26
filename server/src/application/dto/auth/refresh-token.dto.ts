import { z } from 'zod';

export const RefreshTokenDto = z.object({
  refreshToken: z.string(),
});

export type RefreshTokenRequestDto = z.infer<typeof RefreshTokenDto>;