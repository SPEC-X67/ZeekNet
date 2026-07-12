import { z } from 'zod';

export const CreateJobRoleRequestSchema = z.object({
  name: z.string().min(1, 'Job role name is required').max(100, 'Job role name must be less than 100 characters').trim(),
});
export const CreateJobRoleSchema = CreateJobRoleRequestSchema;
export const GetAllJobRolesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
export const UpdateJobRoleRequestSchema = z.object({
  name: z.string().min(1, 'Job role name is required').max(100, 'Job role name must be less than 100 characters').trim(),
});
export const UpdateJobRoleSchema = UpdateJobRoleRequestSchema;
