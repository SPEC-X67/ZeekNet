import { CreateJobCategoryRequestSchema, CreateJobCategorySchema, GetAllJobCategoriesQuerySchema, UpdateJobCategoryRequestSchema, UpdateJobCategorySchema, UpdateJobCategoryGenericSchema } from 'src/application/validations/job-category.validation';
import { z } from 'zod';

export interface JobCategoryDto {
  id: string;
  name: string;
}
export type CreateJobCategoryRequestDto = z.infer<typeof CreateJobCategoryRequestSchema>;
export type GetAllJobCategoriesQueryDto = z.infer<typeof GetAllJobCategoriesQuerySchema>;
export type UpdateJobCategoryRequestDto = z.infer<typeof UpdateJobCategoryRequestSchema>;
export type UpdateJobCategoryGenericRequestDto = z.infer<typeof UpdateJobCategoryGenericSchema>;
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
