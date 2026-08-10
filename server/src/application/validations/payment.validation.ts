import { z } from 'zod';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { PaymentMethod } from 'src/domain/enums/payment-method.enum';
import { BillingCycle } from 'src/domain/enums/billing-cycle.enum';

export const HandleStripeWebhookSchema = z.object({
  payload: z.union([z.string(), z.instanceof(Buffer)]),
  signature: z.string().min(1, 'Signature is required'),
});
export const GetAllPaymentOrdersSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  status: z.enum(['pending', 'completed', 'failed', 'cancelled', 'refunded']).optional(),
  search: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
