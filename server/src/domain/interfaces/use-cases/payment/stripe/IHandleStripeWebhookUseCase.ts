import { HandleStripeWebhookRequestDto } from 'src/application/dtos/payment/payment.dto';;

export interface IHandleStripeWebhookUseCase {
  execute(data: HandleStripeWebhookRequestDto): Promise<{ received: boolean; }>;
}

