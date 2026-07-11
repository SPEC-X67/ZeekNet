import { InitiateCompensationRequestDto, ATSCompensationResponseDto } from 'src/application/dtos/application/compensation.dto';

export interface IInitiateCompensationUseCase {
  execute(dto: InitiateCompensationRequestDto): Promise<ATSCompensationResponseDto>;
}

