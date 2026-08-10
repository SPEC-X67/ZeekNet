import { ATSInterviewResponseDto } from 'src/application/dtos/ats-interview.dto';

export interface IGetInterviewsByApplicationUseCase {
  execute(applicationId: string): Promise<ATSInterviewResponseDto[]>;
}

