import { PaymentResponseDto } from 'src/application/dtos/payment/payment.dto';;

export interface IGetPaymentHistoryUseCase {
  execute(userId: string): Promise<PaymentResponseDto[]>;
}
