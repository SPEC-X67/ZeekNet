import { UserResponseDto } from 'src/application/dtos/user.dto';

export interface IAuthGetUserByIdUseCase {
  execute(userId: string): Promise<UserResponseDto | null>;
}

