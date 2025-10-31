import { baseApi } from './base.api';
import type { LoginPayload, RegisterPayload, GoogleLoginPayload, ApiEnvelope, AuthResponseData } from '@/interfaces/auth';

export const authApi = {
  async login(payload: LoginPayload): Promise<ApiEnvelope<AuthResponseData>> {
    return baseApi.post<AuthResponseData>('/api/auth/login')(payload);
  },

  async adminLogin(payload: LoginPayload): Promise<ApiEnvelope<AuthResponseData>> {
    return baseApi.post<AuthResponseData>('/api/auth/admin-login')(payload);
  },

  async register(payload: RegisterPayload): Promise<ApiEnvelope<AuthResponseData>> {
    return baseApi.post<AuthResponseData>('/api/auth/register')(payload);
  },

  async forgotPassword(email: string): Promise<ApiEnvelope<AuthResponseData>> {
    return baseApi.post<AuthResponseData>('/api/auth/forgot-password')({ email });
  },

  async resetPassword(token: string, newPassword: string): Promise<ApiEnvelope<void>> {
    return baseApi.post<void>('/api/auth/reset-password')({
      token: token,
      newPassword: newPassword
    });
  },

  async requestOtp(email: string): Promise<ApiEnvelope<void>> {
    return baseApi.post<void>('/api/auth/otp-request')({ email });
  },

  async verifyOtp(email: string, code: string): Promise<ApiEnvelope<AuthResponseData>> {
    return baseApi.post<AuthResponseData>('/api/auth/otp-verify')({ email, code });
  },

  async googleLogin(payload: GoogleLoginPayload): Promise<ApiEnvelope<AuthResponseData>> {
    return baseApi.post<AuthResponseData>('/api/auth/login/google')(payload);
  },

  async refreshToken(): Promise<ApiEnvelope<AuthResponseData>> {
    return baseApi.post<AuthResponseData>('/api/auth/refresh')();
  },

  async getCurrentUser(): Promise<ApiEnvelope<AuthResponseData>> {
    return baseApi.get<AuthResponseData>('/api/auth/check-auth')();
  },

  async logout(): Promise<ApiEnvelope<void>> {
    return baseApi.post<void>('/api/auth/logout')();
  }
}