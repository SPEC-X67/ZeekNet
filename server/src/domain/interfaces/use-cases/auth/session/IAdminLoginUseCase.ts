import { LoginRequestDto, LoginResponseDto } from 'src/application/dtos/auth/login.dto';

export interface IAdminLoginUseCase {
  execute(params: LoginRequestDto): Promise<LoginResponseDto>;
}

