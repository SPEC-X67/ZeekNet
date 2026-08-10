import { CreateJobRoleRequestSchema, CreateJobRoleSchema, GetAllJobRolesQuerySchema, UpdateJobRoleRequestSchema, UpdateJobRoleSchema } from 'src/application/validations/job-role.validation';
import { z } from 'zod';

export interface JobRoleDto {
  id: string;
  name: string;
}
export type CreateJobRoleRequestDto = z.infer<typeof CreateJobRoleRequestSchema>;
export type GetAllJobRolesQueryDto = z.infer<typeof GetAllJobRolesQuerySchema>;
export type GetAllJobRolesRequestDto = GetAllJobRolesQueryDto;
export type UpdateJobRoleRequestDto = z.infer<typeof UpdateJobRoleRequestSchema>;
export interface JobRoleResponseDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface PaginatedJobRolesResultDto {
  roles: JobRoleDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
