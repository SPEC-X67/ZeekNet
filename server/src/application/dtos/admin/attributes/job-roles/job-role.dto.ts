import { z } from 'zod';

// Common Entity DTO
export interface JobRoleDto {
  id: string;
  name: string;
}

// Create requests DTO
export const CreateJobRoleRequestDtoSchema = z.object({
  name: z.string().min(1, 'Job role name is required').max(100, 'Job role name must be less than 100 characters').trim(),
});
export type CreateJobRoleRequestDto = z.infer<typeof CreateJobRoleRequestDtoSchema>;
export const CreateJobRoleDto = CreateJobRoleRequestDtoSchema;

// Get All query DTO
export const GetAllJobRolesQueryDtoSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
export type GetAllJobRolesQueryDto = z.infer<typeof GetAllJobRolesQueryDtoSchema>;
export const GetAllJobRolesDto = GetAllJobRolesQueryDtoSchema;
export type GetAllJobRolesRequestDto = GetAllJobRolesQueryDto;

// Update request DTO
export const UpdateJobRoleRequestDtoSchema = z.object({
  name: z.string().min(1, 'Job role name is required').max(100, 'Job role name must be less than 100 characters').trim(),
});
export type UpdateJobRoleRequestDto = z.infer<typeof UpdateJobRoleRequestDtoSchema>;
export const UpdateJobRoleDto = UpdateJobRoleRequestDtoSchema;

// Responses DTO
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
