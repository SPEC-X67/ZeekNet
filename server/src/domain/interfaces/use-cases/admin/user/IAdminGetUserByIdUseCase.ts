import { UserResponseDto } from 'src/application/dtos/auth/user.dto';

export interface IAdminGetUserByIdUseCase {
  execute(userId: string): Promise<UserResponseDto>;
}
