import { LoginRequestDto, LoginResponseDto } from 'src/application/dtos/auth/login.dto';

export interface ILoginUserUseCase {
  execute(params: LoginRequestDto): Promise<LoginResponseDto>;
}

