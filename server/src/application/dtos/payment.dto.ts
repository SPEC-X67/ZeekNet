import { HandleStripeWebhookSchema, GetAllPaymentOrdersSchema } from 'src/application/validations/payment.validation';
import { z } from 'zod';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { PaymentMethod } from 'src/domain/enums/payment-method.enum';
import { BillingCycle } from 'src/domain/enums/billing-cycle.enum';

export type HandleStripeWebhookRequestDto = z.infer<typeof HandleStripeWebhookSchema>;
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
export type GetAllPaymentOrdersRequestDto = z.infer<typeof GetAllPaymentOrdersSchema>;
export interface GetAllPaymentOrdersResponseDto {
  orders: PaymentOrderWithDetailsResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
