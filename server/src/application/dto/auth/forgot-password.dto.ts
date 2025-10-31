import { z } from 'zod';

export const ForgotPasswordDto = z.object({
  email: z.string().email(),
});

export type ForgotPasswordRequestDto = z.infer<typeof ForgotPasswordDto>;