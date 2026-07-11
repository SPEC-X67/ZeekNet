import { CreateJobRoleRequestDto, JobRoleResponseDto } from 'src/application/dtos/admin/attributes/job-roles/job-role.dto';

export interface ICreateJobRoleUseCase {
  execute(dto: CreateJobRoleRequestDto): Promise<JobRoleResponseDto>;
}
