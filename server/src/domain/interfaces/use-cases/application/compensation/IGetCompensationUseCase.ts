import { ATSCompensationResponseDto } from 'src/application/dtos/ats-compensation.dto';

export interface IGetCompensationUseCase {
  execute(applicationId: string): Promise<ATSCompensationResponseDto | null>;
}

