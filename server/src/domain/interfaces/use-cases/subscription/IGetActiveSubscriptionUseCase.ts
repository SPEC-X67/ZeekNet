import { CompanySubscriptionResponseDto } from 'src/application/dtos/subscription/subscription.dto';;

export interface IGetActiveSubscriptionUseCase {
  execute(userId: string): Promise<CompanySubscriptionResponseDto | null>;
}

