import { JobPostingResponseDto, CreateJobPostingRequestDto } from 'src/application/dtos/admin/job/job.dto';

export interface ICreateJobPostingUseCase {
  execute(data: CreateJobPostingRequestDto): Promise<JobPostingResponseDto>;
}

