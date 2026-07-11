import { CompanySubscriptionResponseDto } from 'src/application/dtos/subscription/subscription.dto';;

export interface ICancelSubscriptionUseCase {
  execute(userId: string): Promise<CompanySubscriptionResponseDto>;
}
