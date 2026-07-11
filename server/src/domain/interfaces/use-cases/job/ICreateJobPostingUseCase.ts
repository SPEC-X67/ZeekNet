import { JobPostingResponseDto, CreateJobPostingRequestDto } from 'src/application/dtos/admin/job.dto';

export interface ICreateJobPostingUseCase {
  execute(data: CreateJobPostingRequestDto): Promise<JobPostingResponseDto>;
}

