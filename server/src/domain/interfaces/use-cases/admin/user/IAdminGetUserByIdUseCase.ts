import { UserResponseDto } from 'src/application/dtos/user.dto';

export interface IAdminGetUserByIdUseCase {
  execute(userId: string): Promise<UserResponseDto>;
}
