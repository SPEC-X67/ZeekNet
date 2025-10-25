import { User } from '../../../domain/entities/user.entity';

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResult {
  user: User;
}

export interface LoginResult {
  tokens: AuthTokens;
  user: User;
}
