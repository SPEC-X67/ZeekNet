import { z } from 'zod';

// Common Entity DTO
export interface JobCategoryDto {
  id: string;
  name: string;
}

// Create requests DTO
export const CreateJobCategoryRequestDtoSchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name must not exceed 100 characters'),
});
export type CreateJobCategoryRequestDto = z.infer<typeof CreateJobCategoryRequestDtoSchema>;
export const CreateJobCategoryDto = CreateJobCategoryRequestDtoSchema;

// Get All query DTO
export const GetAllJobCategoriesQueryDto = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});
export type GetAllJobCategoriesQueryDto = z.infer<typeof GetAllJobCategoriesQueryDto>;

// Update request DTO
export const UpdateJobCategoryRequestDtoSchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name must not exceed 100 characters'),
});
export type UpdateJobCategoryRequestDto = z.infer<typeof UpdateJobCategoryRequestDtoSchema>;
export const UpdateJobCategoryDto = UpdateJobCategoryRequestDtoSchema;

export const UpdateJobCategoryGenericDto = z.object({
  id: z.string().min(1, 'Job category ID is required'),
  name: z.string().min(1, 'Job category name is required'),
});
export type UpdateJobCategoryGenericRequestDto = z.infer<typeof UpdateJobCategoryGenericDto>;

// Responses DTO
export interface JobCategoryResponseDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedJobCategoriesResultDto {
  categories: JobCategoryDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
