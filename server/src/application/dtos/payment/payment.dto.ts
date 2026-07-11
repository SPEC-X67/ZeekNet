import { z } from 'zod';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { PaymentMethod } from 'src/domain/enums/payment-method.enum';
import { BillingCycle } from 'src/domain/enums/billing-cycle.enum';

// stripe/requests/handle-stripe-webhook.dto.ts
export const HandleStripeWebhookDto = z.object({
  payload: z.union([z.string(), z.instanceof(Buffer)]),
  signature: z.string().min(1, 'Signature is required'),
});
export type HandleStripeWebhookRequestDto = z.infer<typeof HandleStripeWebhookDto>;

// responses/payment-response.dto.ts
export interface PaymentResponseDto {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  invoiceId?: string;
  transactionId?: string;
  stripeInvoiceUrl?: string;
  stripeInvoicePdf?: string;
  billingCycle?: BillingCycle;
  createdAt?: Date;
}

// responses/payment-order-with-details-response.dto.ts
export interface PaymentOrderWithDetailsResponseDto {
  id: string;
  orderNo: string;
  companyId: string;
  companyName: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  paymentMethod: 'dummy' | 'stripe' | 'card';
  invoiceId?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}
