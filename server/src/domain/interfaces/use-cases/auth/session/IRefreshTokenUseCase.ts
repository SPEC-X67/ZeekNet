import { LoginResponseDto } from 'src/application/dtos/auth/login.dto';

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<LoginResponseDto>;
}

