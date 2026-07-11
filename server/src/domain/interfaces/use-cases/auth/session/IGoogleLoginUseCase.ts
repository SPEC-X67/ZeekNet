import { GoogleLoginRequestDto, LoginResponseDto } from 'src/application/dtos/auth/login.dto';

export interface IGoogleLoginUseCase {
  execute(params: GoogleLoginRequestDto): Promise<LoginResponseDto>;
}

