import { z } from 'zod';

export const CreateSubscriptionPlanRequestSchema = z.object({
  name: z.string().min(1, 'Plan name is required').max(100, 'Plan name must be less than 100 characters').trim(),
  description: z.string().min(1, 'Plan description is required').max(500, 'Plan description must be less than 500 characters').trim(),
  price: z.number().min(0, 'Price must be a positive number'),
  duration: z.number().int().min(1, 'Duration must be at least 1 day'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  jobPostLimit: z.number().int().min(0, 'Job post limit must be a positive number'),
  featuredJobLimit: z.number().int().min(0, 'Featured job limit must be a positive number'),
  applicantAccessLimit: z.number().int().min(0, 'Applicant access limit must be a positive number'),
  yearlyDiscount: z.number().min(0, 'Discount must be at least 0').max(100, 'Discount cannot exceed 100%'),
  isPopular: z.boolean().optional(),
  isDefault: z.boolean().optional(),
}).refine((data) => {
  if (data.isDefault && data.price !== 0) {
    return false;
  }
  return true;
}, {
  message: 'Default plan must have price of 0',
  path: ['price'],
});

export const CreateSubscriptionPlanSchema = z.object({
  name: z.string().min(1, 'Plan name is required'),
  description: z.string().min(1, 'Plan description is required'),
  price: z.number().nonnegative().optional(),
  duration: z.number().int().positive().optional(),
  features: z.array(z.string()),
  jobPostLimit: z.number().int(),
  featuredJobLimit: z.number().int(),
  applicantAccessLimit: z.number().int(),
  yearlyDiscount: z.number().min(0).max(100).optional(),
  isPopular: z.boolean().optional(),
  isDefault: z.boolean().optional(),
});

export const GetAllSubscriptionPlansQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const UpdateSubscriptionPlanRequestSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  name: z.string().min(1, 'Plan name cannot be empty').max(100, 'Plan name must be less than 100 characters').trim().optional(),
  description: z.string().min(1, 'Plan description cannot be empty').max(500, 'Plan description must be less than 500 characters').trim().optional(),
  price: z.number().min(0, 'Price must be a positive number').optional(),
  duration: z.number().int().min(1, 'Duration must be at least 1 day').optional(),
  features: z.array(z.string()).min(1, 'At least one feature is required').optional(),
  jobPostLimit: z.number().int().min(0, 'Job post limit must be a positive number').optional(),
  featuredJobLimit: z.number().int().min(0, 'Featured job limit must be a positive number').optional(),
  applicantAccessLimit: z.number().int().min(0, 'Applicant access limit must be a positive number').optional(),
  yearlyDiscount: z.number().min(0, 'Discount must be at least 0').max(100, 'Discount cannot exceed 100%').optional(),
  isActive: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  isDefault: z.boolean().optional(),
}).refine((data) => {
  if (data.isDefault && data.price !== undefined && data.price !== 0) {
    return false;
  }
  return true;
}, {
  message: 'Default plan must have price of 0',
  path: ['price'],
});

export const UpdateSubscriptionPlanSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  name: z.string().min(1, 'Plan name is required').optional(),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be non-negative').optional(),
  duration: z.number().int().min(0, 'Duration must be non-negative').optional(),
  features: z.array(z.string()).optional(),
  jobPostLimit: z.number().int().min(-1, 'Job post limit must be -1 or greater').optional(),
  featuredJobLimit: z.number().int().min(-1, 'Featured job limit must be -1 or greater').optional(),
  applicantAccessLimit: z.number().int().min(-1, 'Applicant access limit must be -1 or greater').optional(),
  yearlyDiscount: z.number().min(0).max(100, 'Yearly discount must be between 0 and 100').optional(),
  isActive: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  isDefault: z.boolean().optional(),
});
