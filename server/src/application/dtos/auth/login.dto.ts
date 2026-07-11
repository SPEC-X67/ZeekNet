import { z } from 'zod';
import { VALIDATION } from 'src/shared/constants/messages';
import { UserResponseDto } from 'src/application/dtos/auth/user.dto';

// requests/login.dto.ts
export const LoginDto = z.object({
  email: z.string().email(VALIDATION.INVALID_EMAIL),
  password: z.string().min(1, VALIDATION.REQUIRED('Password')),
});
export type LoginRequestDto = z.infer<typeof LoginDto>;

// requests/google-login.dto.ts
export const GoogleLoginDto = z.object({
  idToken: z.string().min(10, 'Invalid Google token'),
});
export type GoogleLoginRequestDto = z.infer<typeof GoogleLoginDto>;

// responses/login-response.dto.ts
export interface LoginResponseDto {
  tokens?: AuthTokens;
  user: UserResponseDto;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
