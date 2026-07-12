import { InitiateCompensationRequestDto, ATSCompensationResponseDto } from 'src/application/dtos/ats-compensation.dto';

export interface IInitiateCompensationUseCase {
  execute(dto: InitiateCompensationRequestDto): Promise<ATSCompensationResponseDto>;
}

