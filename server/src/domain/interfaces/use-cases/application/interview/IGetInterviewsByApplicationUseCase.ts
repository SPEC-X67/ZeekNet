import { ATSInterviewResponseDto } from 'src/application/dtos/application/interview.dto';

export interface IGetInterviewsByApplicationUseCase {
  execute(applicationId: string): Promise<ATSInterviewResponseDto[]>;
}

