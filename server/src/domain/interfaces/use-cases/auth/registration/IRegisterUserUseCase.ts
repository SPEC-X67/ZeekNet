import { RegisterRequestDto, RegisterResponseDto } from 'src/application/dtos/auth.dto';

export interface IRegisterUserUseCase {
  execute(params: RegisterRequestDto): Promise<RegisterResponseDto>;
}

