import { CompanySubscriptionResponseDto } from 'src/application/dtos/company-subscription.dto';;

export interface IGetActiveSubscriptionUseCase {
  execute(userId: string): Promise<CompanySubscriptionResponseDto | null>;
}

