import { ChangeSubscriptionPlanSchema, CreateCheckoutSessionSchema, GetBillingPortalSchema } from 'src/application/validations/company-subscription.validation';
import { z } from 'zod';
import { BillingCycle } from 'src/domain/enums/billing-cycle.enum';

export interface CompanySubscriptionDto {
  id: string;
  companyId: string;
  planId: string;
  status: string;
  startDate: Date;
  endDate: Date;
}
export type ChangeSubscriptionPlanRequestDto = z.infer<typeof ChangeSubscriptionPlanSchema>;
export type CreateCheckoutSessionRequestDto = z.infer<typeof CreateCheckoutSessionSchema>;
export type GetBillingPortalRequestDto = z.infer<typeof GetBillingPortalSchema>;
export interface PreviewPlanChangeRequestDto {
  userId: string;
  newPlanId: string;
  billingCycle?: 'monthly' | 'yearly';
}
export interface CreateCheckoutSessionResponseDto {
  sessionId: string;
  sessionUrl: string;
}
export interface ActiveSubscriptionResponseDto extends CompanySubscriptionDto {
  activeJobCount?: number;
}
export interface ChangeSubscriptionResult {
  subscription: CompanySubscriptionDto;
  prorationAmount?: number;
}
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
