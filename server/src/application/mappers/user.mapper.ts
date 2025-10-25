import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dto/auth/user-response.dto';
import { UserRole } from '../../domain/enums/user-role.enum';

export class UserMapper {
  static toDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(data: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    isBlocked: boolean;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return User.create({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role as UserRole, 
      isVerified: data.isVerified,
      isBlocked: data.isBlocked,
      refreshToken: data.refreshToken,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
