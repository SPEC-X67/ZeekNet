import { HandleStripeWebhookRequestDto } from 'src/application/dtos/payment.dto';;

export interface IHandleStripeWebhookUseCase {
  execute(data: HandleStripeWebhookRequestDto): Promise<{ received: boolean; }>;
}

