import { CreateJobRoleRequestDto, JobRoleResponseDto } from 'src/application/dtos/job-role.dto';

export interface ICreateJobRoleUseCase {
  execute(dto: CreateJobRoleRequestDto): Promise<JobRoleResponseDto>;
}
