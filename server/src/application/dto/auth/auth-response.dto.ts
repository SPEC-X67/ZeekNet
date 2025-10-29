import { User } from '../../../domain/entities/user.entity';
import { UserResponseDto } from './user-response.dto';

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResult {
  user: UserResponseDto;
}

export interface LoginResult {
  tokens?: AuthTokens;
  user: UserResponseDto;
}
