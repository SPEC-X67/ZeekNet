import { LoginRequestDto, LoginResponseDto } from 'src/application/dtos/auth.dto';

export interface IAdminLoginUseCase {
  execute(params: LoginRequestDto): Promise<LoginResponseDto>;
}

