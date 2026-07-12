import type { JobApplicationDetailResponseDto } from 'src/application/dtos/job-application.dto';
import { DeleteInterviewDto } from 'src/application/dtos/ats-interview.dto';;

export interface IDeleteInterviewUseCase {
  execute(dto: DeleteInterviewDto): Promise<JobApplicationDetailResponseDto>;
}

