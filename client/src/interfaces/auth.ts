import { UserRole } from '@/constants/enums'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface GoogleLoginPayload {
  idToken: string
}

export interface AuthResponseData {
  id: string
  name: string
  email: string
  role: UserRole
  isVerified: boolean
  isBlocked: boolean
}

export interface ApiEnvelope<T> {
  success: boolean
  message?: string
  data?: T
  token?: string
  refreshToken?: string
  errors?: Array<{ field: string; message: string }>
}


