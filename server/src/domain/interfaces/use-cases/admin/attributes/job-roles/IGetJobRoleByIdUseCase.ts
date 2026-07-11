import { JobRoleResponseDto } from 'src/application/dtos/admin/job-role.dto';

export interface IGetJobRoleByIdUseCase {
  execute(jobRoleId: string): Promise<JobRoleResponseDto>;
}
