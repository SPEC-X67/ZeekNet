import { ATSCompensationResponseDto } from 'src/application/dtos/application/compensation.dto';

export interface IGetCompensationUseCase {
  execute(applicationId: string): Promise<ATSCompensationResponseDto | null>;
}

