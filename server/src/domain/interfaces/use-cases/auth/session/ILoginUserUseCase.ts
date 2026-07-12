import { LoginRequestDto, LoginResponseDto } from 'src/application/dtos/auth.dto';

export interface ILoginUserUseCase {
  execute(params: LoginRequestDto): Promise<LoginResponseDto>;
}

