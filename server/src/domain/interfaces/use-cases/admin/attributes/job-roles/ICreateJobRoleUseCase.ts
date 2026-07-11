import { CreateJobRoleRequestDto, JobRoleResponseDto } from 'src/application/dtos/admin/job-role.dto';

export interface ICreateJobRoleUseCase {
  execute(dto: CreateJobRoleRequestDto): Promise<JobRoleResponseDto>;
}
