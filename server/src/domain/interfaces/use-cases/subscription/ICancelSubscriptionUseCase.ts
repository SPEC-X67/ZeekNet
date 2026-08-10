import { CompanySubscriptionResponseDto } from 'src/application/dtos/company-subscription.dto';;

export interface ICancelSubscriptionUseCase {
  execute(userId: string): Promise<CompanySubscriptionResponseDto>;
}
