import { JobRole } from 'src/domain/entities/job-role.entity';
import { JobRoleResponseDto } from 'src/application/dtos/job-role.dto';

export class JobRoleMapper {
  static toResponse(jobRole: JobRole): JobRoleResponseDto {
    return {
      id: jobRole.id,
      name: jobRole.name,
      createdAt: jobRole.createdAt,
      updatedAt: jobRole.updatedAt,
    };
  }

  static toResponseList(jobRoles: JobRole[]): JobRoleResponseDto[] {
    return jobRoles.map((role) => this.toResponse(role));
  }
}

