import { JobRoleResponseDto } from 'src/application/dtos/admin/attributes/job-roles/job-role.dto';

export interface IGetJobRoleByIdUseCase {
  execute(jobRoleId: string): Promise<JobRoleResponseDto>;
}
