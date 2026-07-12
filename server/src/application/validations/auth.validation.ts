import { z } from 'zod';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { VALIDATION } from 'src/shared/constants/messages';
import { UserResponseDto } from '../dtos/user.dto';

export const LoginSchema = z.object({
  email: z.string().email(VALIDATION.INVALID_EMAIL),
  password: z.string().min(1, VALIDATION.REQUIRED('Password')),
});
export const GoogleLoginSchema = z.object({
  idToken: z.string().min(10, 'Invalid Google token'),
});
export const RegisterSchema = z.object({
  name: z.string().min(1, VALIDATION.REQUIRED('Name')).min(2, VALIDATION.MIN_LENGTH('Name', 2)).max(50, VALIDATION.MAX_LENGTH('Name', 50)),
  email: z.string().email(VALIDATION.INVALID_EMAIL),
  password: z.string().min(6, VALIDATION.PASSWORD_STRENGTH),
  role: z.nativeEnum(UserRole).optional().default(UserRole.SEEKER),
});
export const RequestOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
});
export const VerifyOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().length(6, 'OTP code must be 6 characters'),
});
