import { injectable } from 'inversify';
import { RegisterRequestDto } from '../dto/auth/register.dto';
import { User } from '../../domain/entities/user.entity';
import { UserData, UserResponseDto, AuthResponseDto } from './types';

@injectable()
export class UserMapper {
  
  toDomain(dto: RegisterRequestDto, id: string): UserData {
    return {
      id,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
      isVerified: false,
      isBlocked: false,
      refreshToken: null,
    };
  }

  toDto(domain: User): UserResponseDto {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      role: domain.role,
      is_verified: domain.isVerified,
      is_blocked: domain.isBlocked,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  toAuthResponse(user: User, tokens: { accessToken: string; refreshToken: string }): AuthResponseDto {
    return {
      user: this.toDto(user),
      tokens,
    };
  }
}