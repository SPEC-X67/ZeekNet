import { z } from 'zod';

export const CreateJobCategoryRequestSchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name must not exceed 100 characters'),
});
export const CreateJobCategorySchema = CreateJobCategoryRequestSchema;
export const GetAllJobCategoriesQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});
export const UpdateJobCategoryRequestSchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name must not exceed 100 characters'),
});
export const UpdateJobCategorySchema = UpdateJobCategoryRequestSchema;
export const UpdateJobCategoryGenericSchema = z.object({
  id: z.string().min(1, 'Job category ID is required'),
  name: z.string().min(1, 'Job category name is required'),
});
