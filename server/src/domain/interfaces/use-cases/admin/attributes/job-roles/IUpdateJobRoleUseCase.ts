import { UpdateJobRoleRequestDto, JobRoleResponseDto } from 'src/application/dtos/admin/job-role.dto';

export interface IUpdateJobRoleUseCase {
  execute(jobRoleId: string, dto: UpdateJobRoleRequestDto): Promise<JobRoleResponseDto>;
}
