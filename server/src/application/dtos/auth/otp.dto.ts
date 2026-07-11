import { z } from 'zod';

// verification/request-otp.use-case.ts
export const RequestOtpDto = z.object({
  email: z.string().email('Invalid email address'),
});
export type RequestOtpRequestDto = z.infer<typeof RequestOtpDto>;

// verification/verify-otp.dto.ts
export const VerifyOtpDto = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().length(6, 'OTP code must be 6 characters'),
});
export type VerifyOtpRequestDto = z.infer<typeof VerifyOtpDto>;
