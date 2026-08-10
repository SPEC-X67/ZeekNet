import { JobRoleResponseDto } from 'src/application/dtos/job-role.dto';

export interface IGetJobRoleByIdUseCase {
  execute(jobRoleId: string): Promise<JobRoleResponseDto>;
}
