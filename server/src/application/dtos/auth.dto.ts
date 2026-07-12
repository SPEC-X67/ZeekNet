import { LoginSchema, GoogleLoginSchema, RegisterSchema, RequestOtpSchema, VerifyOtpSchema } from 'src/application/validations/auth.validation';
import { z } from 'zod';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { VALIDATION } from 'src/shared/constants/messages';
import { UserResponseDto } from './user.dto';

export type LoginRequestDto = z.infer<typeof LoginSchema>;
export type GoogleLoginRequestDto = z.infer<typeof GoogleLoginSchema>;
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
export interface LoginResponseDto {
  tokens?: AuthTokens;
  user: UserResponseDto;
}
export type RegisterRequestDto = z.infer<typeof RegisterSchema>;
export interface RegisterResponseDto {
  user: UserResponseDto;
}
export type RequestOtpRequestDto = z.infer<typeof RequestOtpSchema>;
export type VerifyOtpRequestDto = z.infer<typeof VerifyOtpSchema>;
