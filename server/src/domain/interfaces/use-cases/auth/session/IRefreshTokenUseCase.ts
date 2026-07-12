import { LoginResponseDto } from 'src/application/dtos/auth.dto';

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<LoginResponseDto>;
}

