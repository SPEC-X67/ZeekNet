import { RegisterRequestDto, RegisterResponseDto } from 'src/application/dtos/auth/register.dto';

export interface IRegisterUserUseCase {
  execute(params: RegisterRequestDto): Promise<RegisterResponseDto>;
}

