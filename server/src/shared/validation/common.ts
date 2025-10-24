import { z } from 'zod';

export const commonValidations = {
  email: z.string().email('Please enter a valid email address'),

  requiredString: (minLength = 1, message?: string) =>
    z.string().min(minLength, message || `Must be at least ${minLength} character${minLength > 1 ? 's' : ''}`),

  optionalUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),

  requiredUrl: z.string().url('Please enter a valid URL'),

  password: z.string().min(6, 'Password must be at least 6 characters'),

  strongPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),

  positiveInteger: z.number().int().positive('Must be a positive integer'),

  nonNegativeInteger: z.number().int().min(0, 'Must be a non-negative integer'),

  date: z.string().datetime('Please enter a valid date'),

  optionalDate: z.string().datetime('Please enter a valid date').optional(),

  boolean: z.boolean(),

  optionalBoolean: z.boolean().optional(),

  arrayWithMinItems: <T>(schema: z.ZodType<T>, minItems = 1) =>
    z.array(schema).min(minItems, `Must have at least ${minItems} item${minItems > 1 ? 's' : ''}`),

  pagination: z.object({
    page: z.string().regex(/^\d+$/, 'Page must be a number').transform(Number).default('1'),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').transform(Number).default('10'),
  }),

  search: z.string().optional(),

  sort: z.string().optional(),

  order: z.enum(['asc', 'desc']).optional(),
};

export const fieldValidations = {
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),

  personName: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),

  location: z
    .string()
    .min(1, 'Location is required')
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must be less than 100 characters'),

  industry: z
    .string()
    .min(1, 'Industry is required')
    .min(2, 'Industry must be at least 2 characters')
    .max(50, 'Industry must be less than 50 characters'),

  employeeCount: z
    .string()
    .min(1, 'Employee count is required')
    .refine((val) => {
      const validOptions = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
      return validOptions.includes(val);
    }, 'Please select a valid employee count range'),

  taxId: z.string().min(1, 'Tax ID is required').min(3, 'Tax ID must be at least 3 characters').max(20, 'Tax ID must be less than 20 characters'),
};

export const queryBuilders = {
  pagination: (page: number, limit: number) => ({
    page: page.toString(),
    limit: limit.toString(),
  }),

  search: (searchTerm: string) => ({
    search: searchTerm,
  }),

  filter: (filters: Record<string, unknown>) => {
    const queryParams: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams[key] = value.toString();
      }
    });
    return queryParams;
  },

  sort: (field: string, order: 'asc' | 'desc' = 'asc') => ({
    sort: field,
    order: order,
  }),
};

export const responseBuilders = {
  paginated: <T>(
    data: T[],
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    }
  ) => ({
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: pagination.totalPages,
      hasNext: pagination.hasNext,
      hasPrev: pagination.hasPrev,
    },
  }),

  success: <T>(message: string, data: T, token?: string) => ({
    success: true,
    message,
    data,
    ...(token && { token }),
  }),

  error: (message: string, data: unknown = null) => ({
    success: false,
    message,
    data,
  }),
};
