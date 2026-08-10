import { GoogleLoginRequestDto, LoginResponseDto } from 'src/application/dtos/auth.dto';

export interface IGoogleLoginUseCase {
  execute(params: GoogleLoginRequestDto): Promise<LoginResponseDto>;
}

