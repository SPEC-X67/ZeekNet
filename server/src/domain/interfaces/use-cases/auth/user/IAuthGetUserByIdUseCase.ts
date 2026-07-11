import { UserResponseDto } from 'src/application/dtos/auth/user.dto';

export interface IAuthGetUserByIdUseCase {
  execute(userId: string): Promise<UserResponseDto | null>;
}

