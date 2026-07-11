import { z } from 'zod';
import { BillingCycle } from 'src/domain/enums/billing-cycle.enum';
import { CompanySubscriptionDto } from 'src/application/dtos/admin/subscription.dto';

// requests/change-subscription-plan.dto.ts
export const ChangeSubscriptionPlanDto = z.object({
  userId: z.string().optional(),
  newPlanId: z.string().min(1, 'Plan ID is required'),
  billingCycle: z.nativeEnum(BillingCycle).optional(),
});
export type ChangeSubscriptionPlanRequestDto = z.infer<typeof ChangeSubscriptionPlanDto>;

// requests/create-checkout-session.dto.ts
export const CreateCheckoutSessionDto = z.object({
  userId: z.string().optional(),
  planId: z.string().min(1, 'Plan ID is required'),
  billingCycle: z.nativeEnum(BillingCycle, {
    required_error: 'Billing cycle is required',
    invalid_type_error: 'Billing cycle must be either monthly or yearly',
  }),
  successUrl: z.string().url('Invalid success URL'),
  cancelUrl: z.string().url('Invalid cancel URL'),
});
export type CreateCheckoutSessionRequestDto = z.infer<typeof CreateCheckoutSessionDto>;

// requests/create-subscription-plan.dto.ts
export const CreateSubscriptionPlanDtoSchema = z.object({
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
export type CreateSubscriptionPlanDto = z.infer<typeof CreateSubscriptionPlanDtoSchema>;

// requests/get-billing-portal.dto.ts
export const GetBillingPortalDto = z.object({
  userId: z.string().optional(),
  returnUrl: z.string().url('Invalid return URL'),
});
export type GetBillingPortalRequestDto = z.infer<typeof GetBillingPortalDto>;

// requests/preview-plan-change.dto.ts
export interface PreviewPlanChangeRequestDto {
  userId: string;
  newPlanId: string;
  billingCycle?: 'monthly' | 'yearly';
}

// requests/update-subscription-plan.dto.ts
export const UpdateSubscriptionPlanDtoSchema = z.object({
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
export type UpdateSubscriptionPlanDto = z.infer<typeof UpdateSubscriptionPlanDtoSchema>;

// responses/checkout-session-response.dto.ts
export interface CreateCheckoutSessionResponseDto {
  sessionId: string;
  sessionUrl: string;
}

// responses/active-subscription-response.dto.ts
export interface ActiveSubscriptionResponseDto extends CompanySubscriptionDto {
  activeJobCount?: number;
}

// responses/change-subscription-result.dto.ts
export interface ChangeSubscriptionResult {
  subscription: CompanySubscriptionDto;
  prorationAmount?: number;
}

// responses/preview-plan-change-response.dto.ts
export type PlanChangeType = 'upgrade' | 'downgrade' | 'lateral' | 'new';

export interface JobToUnlistDetail {
  id: string;
  title: string;
  applicantCount: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface PlanChangeImpact {
  changeType: PlanChangeType;
  jobsToUnlist: number;
  jobsToUnlistDetails: JobToUnlistDetail[];
  featuredJobsToUnlist: number;
  candidateViewsChange: number;
  jobPostLimitChange: number;
  featuredJobLimitChange: number;
  currentJobPostsUsed: number;
  currentFeaturedJobsUsed: number;
  newJobPostLimit: number;
  newFeaturedJobLimit: number;
  newCandidateViewLimit: number;
  estimatedProration?: number;
  billingCycleChange?: boolean;
}

export interface PreviewPlanChangeResponseDto {
  success: boolean;
  impact: PlanChangeImpact;
  currentPlan: {
    id: string;
    name: string;
    price: number;
    billingCycle: string;
  };
  newPlan: {
    id: string;
    name: string;
    price: number;
    billingCycle: string;
  };
  message?: string;
}

// responses/subscription-response.dto.ts
export interface CompanySubscriptionResponseDto {
  id: string;
  companyId: string;
  planId: string;
  plan: {
    id: string;
    name: string;
    jobPostLimit: number;
    featuredJobLimit: number;
    applicantAccessLimit: number;
    isDefault?: boolean;
  };
  startDate: Date | null;
  expiryDate: Date | null;
  isActive: boolean;
  jobPostsUsed: number;
  featuredJobsUsed: number;
  applicantAccessUsed: number;
  activeJobCount: number;
  createdAt: Date;
  updatedAt: Date;
  stripeStatus?: string;
  billingCycle?: 'monthly' | 'yearly';
  cancelAtPeriodEnd?: boolean;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}
