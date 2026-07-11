import { z } from 'zod';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { PaymentMethod } from 'src/domain/enums/payment-method.enum';
import { BillingCycle } from 'src/domain/enums/billing-cycle.enum';

// requests/payment-order.dto.ts
export const GetAllPaymentOrdersDto = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  status: z.enum(['pending', 'completed', 'failed', 'cancelled', 'refunded']).optional(),
  search: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
export type GetAllPaymentOrdersRequestDto = z.infer<typeof GetAllPaymentOrdersDto>;

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

// responses/get-all-payment-orders-response.dto.ts
export interface GetAllPaymentOrdersResponseDto {
  orders: PaymentOrderWithDetailsResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

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
