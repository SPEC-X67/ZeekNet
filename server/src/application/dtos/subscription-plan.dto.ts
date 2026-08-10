import { z } from 'zod';
import {
  CreateSubscriptionPlanRequestSchema,
  CreateSubscriptionPlanSchema,
  GetAllSubscriptionPlansQuerySchema,
  UpdateSubscriptionPlanRequestSchema,
  UpdateSubscriptionPlanSchema,
} from 'src/application/validations/subscription-plan.validation';

export interface SubscriptionPlanDto {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
}

export type CreateSubscriptionPlanRequestDto = z.infer<typeof CreateSubscriptionPlanRequestSchema>;
export type CreateSubscriptionPlanDto = z.infer<typeof CreateSubscriptionPlanSchema>;
export type GetAllSubscriptionPlansQueryDto = z.infer<typeof GetAllSubscriptionPlansQuerySchema>;
export type UpdateSubscriptionPlanRequestDto = z.infer<typeof UpdateSubscriptionPlanRequestSchema>;
export type UpdateSubscriptionPlanDto = z.infer<typeof UpdateSubscriptionPlanSchema>;

export interface PaginatedSubscriptionPlansResultDto {
  plans: SubscriptionPlanDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SubscriptionPlanResponseDto {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  yearlyDiscount: number;
  features: string[];
  jobPostLimit: number;
  featuredJobLimit: number;
  applicantAccessLimit: number;
  isActive: boolean;
  isPopular: boolean;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  stripeProductId?: string;
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
}
